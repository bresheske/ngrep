# nGrep
This is a very simple grep tool written in nodeJS. 

## Dependencies
nGrep requires nodeJS to be installed.

## Installing
Pull the latest code and run these commands:
```
npm install
npm run tsc
npm run build
```
That will produce a 'ngrep.exe' file which is executable.

## Usage
Example: search for a filename
```
ngrep -f "\\readme\.md$"
```
Example: search a file for contents
```
ngrep -f "\\readme\.md$" -r "^Example:"
```
Example: writing output to file
```
ngrep -f "\\readme\.md$" -r "^Example:" > c:\temp\out.txt
```
Output will look something like this:
```
...
C:\projects\grep\readme.md:17
C:\projects\grep\readme.md:21
C:\projects\grep\readme.md:25
...
```