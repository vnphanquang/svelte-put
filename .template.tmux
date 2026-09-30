#!/usr/bin/env bash

### [for tmux-template check, do not remove]
### template.id="svelte-put"
### [use the id value consistently throughout the script]

main() {
	local RED='\033[0;31m'
	local NC='\033[0m' # No Color
	local workdir="$(dirname "$(realpath "${BASH_SOURCE[0]}")")"
	local session="svelte-put"
	local win_code="󱥇 editor"
	local win_terms=" terminals"

	if ! tmux has-session -t "$session" 2>/dev/null; then
		tmux new-session -d -n "$win_code" -s "$session" -c "$workdir" "command -v devenv >/dev/null 2>&1 && devenv shell || echo -e '${RED}devenv is not available, consider using it: https://devenv.sh/! ${NC}';exec $SHELL"

		# create second window for terminals
		tmux new-window -n "$win_terms" -c "$workdir" "command -v devenv >/dev/null 2>&1 && devenv shell || exec $SHELL"

		tmux split-window -h -t "$session:$win_terms.1" -c "$workdir" "command -v devenv >/dev/null 2>&1 && DEVENV_CD=sites/docs devenv shell || exec $SHELL"

		tmux select-window -t "$session:$win_code"
	fi

	tmux -2u attach -d -t "$session"
}

main
