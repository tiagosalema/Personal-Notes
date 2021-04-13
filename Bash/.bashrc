# This file customizes how the bash window looks like by default

bold=$(tput bold);
orange=$(tput setaf 166);
green=$(tput setaf 71);
reset=$(tput sgr0);

PS1="\n";
PS1+="\[${bold}\]";
PS1+="\[${orange}\]\W";
PS1+="\n";
PS1+="\[${green}\]$ \[${reset}\]";
export PS1;