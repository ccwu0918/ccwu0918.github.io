const fs = require('fs');
const filePath = 'c:\\Users\\Administrator\\Documents\\c-core-quiz\\index.html';
let content = fs.readFileSync(filePath, 'utf8');

const isCrlf = content.includes('\r\n');
const newline = isCrlf ? '\r\n' : '\n';

// 1. Define the commented rules block
const commentedRules = `rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    // 允許所有人讀寫測驗狀態 (如 activeQuizId, autoGrading, showExplanations)
    match /config/quizStatus {
      allow read, write: if true;
    }
    
    // 允許所有人讀取教師白名單；僅已登入用戶可寫入 (如首次登入的教師)
    match /config/teachers {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // 允許所有人讀取無答案的題目資料；僅教師帳號能新增、編輯和刪除
    match /quizzes/{quizId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    
    // 標準答案與解析防弊保護區
    match /quiz_answers/{quizId} {
      allow write: if request.auth != null;
      // 學生只有在「已登入」且「老師開啟解析」時，才允許讀取答案與解析
      // 教師白名單中的信箱則不受限制，隨時可讀取
      allow read: if request.auth != null && (
        get(/databases/\$(database)/documents/config/quizStatus).data.showExplanations == true ||
        (exists(/databases/\$(database)/documents/config/teachers) && 
         get(/databases/\$(database)/documents/config/teachers).data.authorizedEmails.hasAny([request.auth.token.email]))
      );
    }
    
    // 測驗結果 (已登入學生交卷、教師閱卷、刪除成績)
    match /results/{resultId} {
      allow create, read, update, delete: if request.auth != null;
    }
  }
}`;

// 3. Define the exact text targets in copyRules JS function
const targetJs = `                        const rules = \`rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /config/quizStatus {
      allow read, write: if true;
    }
    match /config/teachers {
      allow read: if true;
      allow write: if request.auth != null;
    }
    match /quizzes/{quizId} {
      allow read: if true;
      allow create, update, delete: if request.auth != null;
    }
    match /quiz_answers/{quizId} {
      allow write: if request.auth != null;
      allow read: if request.auth != null && (
        get(/databases/\$(database)/documents/config/quizStatus).data.showExplanations == true ||
        (exists(/databases/\$(database)/documents/config/teachers) && 
         get(/databases/\$(database)/documents/config/teachers).data.authorizedEmails.hasAny([request.auth.token.email]))
      );
    }
    match /results/{resultId} {
      allow create, read, update, delete: if request.auth != null;
    }
  }
}\`;`;

const cleanStr = (s) => s.replace(/\r\n/g, '\n').trim();

function applyPatch(target, replacement) {
    const normContent = content.replace(/\r\n/g, '\n');
    const normTarget = cleanStr(target);
    
    if (normContent.includes(normTarget)) {
        const targetLines = target.split(/\r?\n/).map(l => l.trim());
        const replacementLines = replacement.split(/\r?\n/);
        
        const contentLines = content.split(/\r?\n/);
        let foundIndex = -1;
        
        for (let i = 0; i < contentLines.length - targetLines.length; i++) {
            let match = true;
            for (let j = 0; j < targetLines.length; j++) {
                if (contentLines[i + j].trim() !== targetLines[j]) {
                    match = false;
                    break;
                }
            }
            if (match) {
                foundIndex = i;
                break;
            }
        }
        
        if (foundIndex !== -1) {
            contentLines.splice(foundIndex, targetLines.length, ...replacementLines);
            content = contentLines.join(newline);
            console.log("Success patching rules block!");
            return true;
        }
    }
    console.log("Failed to find target block");
    return false;
}

// Replacement for JS rules definition
const rulesJsReplacement = `                        const rules = \`${commentedRules.replace(/databases\/\$\(database\)/g, 'databases/\\$(database)')}\`;`;

applyPatch(targetJs, rulesJsReplacement);

fs.writeFileSync(filePath, content, 'utf8');
console.log("Done patching copyRules template in index.html!");
