"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""
" => Self Setting
"""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""""

" set colors cheme
set background=dark

" stop vim-go warning
let g:go_version_warning = 0

" Set relative number
set number
set relativenumber

" Enable folding with the spacebar
nnoremap <space> za

" make backspaces more powerfull
set backspace=indent,eol,start

"it would be nice to set tag files by the active virtualenv here
":set tags=~/mytags "tags for ctags and taglist
"omnicomplete
autocmd FileType python set omnifunc=pythoncomplete#Complete

" Python setting

" Keep indentation level from previous line:
autocmd FileType python set autoindent

" Folding based on indentation:
autocmd FileType python set foldmethod=indent

let python_highlight_all=1
syntax on
au BufRead,BufNewFile *.py,*pyw,*.c,*.h
\ set textwidth=100 |
\ set softtabstop=4 |
\ set expandtab |
\ set cursorcolumn |
\ set autoindent |
\ set fileformat=unix |
\ set foldmethod=indent |
\ set foldlevel=99 |

" highlight unnecessary white space
highlight BadWhitespace ctermbg=red guibg=red
au BufRead,BufNewFile *.py,*.pyw,*.c,*.h match BadWhitespace /\s\+$/

" Display tabs at the beginning of a line in Python mode as bad.
au BufRead,BufNewFile *.py,*.pyw match BadWhitespace /^\t\+/

" Run current python file
au BufRead *.py map <buffer> <F5> :w<CR>:!/usr/bin/env python % <CR>

" Custom Key Map
imap kj <Esc>
