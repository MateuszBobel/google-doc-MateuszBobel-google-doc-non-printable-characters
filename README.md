<h1>📑 Google doc non-printable characters</h1>

*Displays non-printable characters within a gDocs using google apps script.*

### Installation Instructions

You can use this code in 2 ways:
#### Manually
1. Go to your google doc file.
2. Go to **Extensions > Apps Script**. 
3. Copy content `Constans.js` and `Code.js` from the repository to `Code.js` in the apps script editor.
4. 💾 Save project.
5. Refresh google doc window.

#### Using clasp
1. Install [clasp](https://github.com/google/clasp).
2. Clone this repository.
3. Open your google doc file.
4. Go to **Extensions > Apps Script**.
5. Go to project settings and copy project ID.
6. Create `.clasp.json` in the project root folder.
```json
{
  "scriptId": "here paste project ID",
  "rootDir": "./src"
}
```

7. Push code using clasp.
```bash
  clasp push
```
8. Refresh google doc window.

### Characters

| Symbols         | Meaning                                                               |
| ----------------- | ------------------------------------------------------------------ |
| ❡ | empty paragraph |
| ❡ | end of paragraph |
| ⏎ | new line |
| ↡ | page break |
| ▪ | simple space |
| → | tabulation |


### How to use?
Copied code adds *Custom Menu* to the document. 
It allows you to add/remove non-printable characters symbols.

### Limitations
Code modify the original document content by adding the above characters before/ in place of the non-visible one.


