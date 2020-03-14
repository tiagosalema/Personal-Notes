# Add to github

1. `git init`

2. `git add .`

3. `git commit -m "first commit"`

   Note: It's possible to combine 2. and 3. by doing `git commit -a -m "first commit"`

4. At the top right of any Github page: `+`/ `New Repository`

5. `git remote add origin https://github.com/tiagosalema/...`

6. `git push origin master`

To remove an existing file that was later included in `.gitignore`:

+ `git rm -r --cached file_name`

If it's not possible to push because there were changes done remotely:

+ `git pull --rebase origin master`
  After executing this once, t