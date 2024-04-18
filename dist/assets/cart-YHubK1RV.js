import{u as v}from"./cart-BNK9NB1p.js";import{A as w,o as n,c as e,f as o,F as l,x as r,e as i,t as c,B as k,p as m,C as y}from"./app-D-EK3ymx.js";import{b as d}from"./route-block-B_A1xBdJ.js";import{_ as M}from"./_plugin-vue_export-helper-DlAUqK2U.js";const C="/assets/Screenshot%202024-02-23%205.37.34%20PM-psvv1EOA.png",U="/assets/Screenshot%202024-03-29%207.23.56%20PM-BWw2rnOt.png",A="/assets/Screenshot%202024-03-29%207.24.15%20PM-BdNq-0G6.png",S="/assets/Screenshot%202024-03-29%207.24.41%20PM-74R94K7C.png",P="/assets/Screenshot%202024-03-29%207.24.50%20PM-Dwg8UkBd.png",I="/assets/Screenshot%202024-03-29%207.25.01%20PM-Cb564PIb.png",O="/assets/Screenshot%202024-03-29%207.25.12%20PM-BgLCxI0Z.png",R="/assets/Screenshot%202024-03-29%207.25.25%20PM-CJ2xplzy.png",E="/assets/Screenshot%202024-04-03%2010.31.08%20PM-7Mty2KYj.png",j="/assets/greg-rakozy-oMpAz-DN-9I-unsplash-DusxaUm4.jpg",L="/assets/jordan-wozniak-xP_AGmeEa6s-unsplash-Dbqyq6Z0.jpg",T="/assets/joseph-barrientos-oQl0eVYd_n8-unsplash-BCU4fhzR.jpg",q="/assets/kirsten-frank-7LDcvZbEPQs-unsplash-C73KN5dW.jpg",N=[{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/api.lua",size:8408,text:`---@mod comment.api Core Lua API
---@brief [[
---This module provides the core lua APIs which is used by the default keybindings
---and <Plug> (Read |comment.plugmap|) mappings. These API can be used to setup your
---own custom keybindings or to even make your (un)comment function.
---@brief ]]

local Config = require('Comment.config')
local U = require('Comment.utils')
local Op = require('Comment.opfunc')
local Ex = require('Comment.extra')
local A = vim.api

local api, core = {}, {}

---API metamethods
---@param that table
---@param ctype CommentType
---@return table
function core.__index(that, ctype)
    local idxd = {}
    local mode, type = that.cmode, U.ctype[ctype]

    ---To comment the current-line
    ---NOTE:
    ---In current-line linewise method, 'opmode' is not useful which is always equals to \`char\`
    ---but we need 'nil' here which is used for current-line
    function idxd.current(_, cfg)
        U.catch(Op.opfunc, nil, cfg or Config:get(), mode, type)
    end

    ---To comment lines with a count
    function idxd.count(count, cfg)
        U.catch(Op.count, count or A.nvim_get_vvar('count'), cfg or Config:get(), mode, type)
    end

    ---@private
    ---To comment lines with a count, also dot-repeatable
    ---WARN: This is not part of the API but anyone case use it, if they want
    function idxd.count_repeat(_, count, cfg)
        idxd.count(count, cfg)
    end

    return setmetatable({}, {
        __index = idxd,
        __call = function(_, motion, cfg)
            U.catch(Op.opfunc, motion, cfg or Config:get(), mode, type)
        end,
    })
end

---@tag comment.api.toggle.linewise
---@tag comment.api.toggle.blockwise
---Provides API to toggle comments over a region, on current-line, or with a
---count using line or block comment string.
---
---Every function takes a {motion} argument, except '*.count()' function which
---takes an {count} argument, and an optional {config} parameter.
---@type table A metatable containing API functions
---@see comment.opfunc.OpMotion
---@see comment.config
---@usage [[
---local api = require('Comment.api')
---local config = require('Comment.config'):get()
---
---api.toggle.linewise(motion, config?)
---api.toggle.linewise.current(motion?, config?)
---api.toggle.linewise.count(count, config?)
---
---api.toggle.blockwise(motion, config?)
---api.toggle.blockwise.current(motion?, config?)
---api.toggle.blockwise.count(count, config?)
---
----- Toggle current line (linewise) using C-/
---vim.keymap.set('n', '<C-_>', api.toggle.linewise.current)
---
----- Toggle current line (blockwise) using C-\\
---vim.keymap.set('n', '<C-\\\\>', api.toggle.blockwise.current)
---
----- Toggle lines (linewise) with dot-repeat support
----- Example: <leader>gc3j will comment 4 lines
---vim.keymap.set(
---    'n', '<leader>gc', api.call('toggle.linewise', 'g@'),
---    { expr = true }
---)
---
----- Toggle lines (blockwise) with dot-repeat support
----- Example: <leader>gb3j will comment 4 lines
---vim.keymap.set(
---    'n', '<leader>gb', api.call('toggle.blockwise', 'g@'),
---    { expr = true }
---)
---
---local esc = vim.api.nvim_replace_termcodes(
---    '<ESC>', true, false, true
---)
---
----- Toggle selection (linewise)
---vim.keymap.set('x', '<leader>c', function()
---    vim.api.nvim_feedkeys(esc, 'nx', false)
---    api.toggle.linewise(vim.fn.visualmode())
---end)
---
----- Toggle selection (blockwise)
---vim.keymap.set('x', '<leader>b', function()
---    vim.api.nvim_feedkeys(esc, 'nx', false)
---    api.toggle.blockwise(vim.fn.visualmode())
---end)
---@usage ]]
api.toggle = setmetatable({ cmode = U.cmode.toggle }, core)

---@tag comment.api.comment.linewise
---@tag comment.api.comment.blockwise
---Provides API to (only) comment a region, on current-line, or with a
---count using line or block comment string.
---
---Every function takes a {motion} argument, except '*.count()' function which
---takes an {count} argument, and an optional {config} parameter.
---@type table A metatable containing API functions
---@see comment.opfunc.OpMotion
---@see comment.config
---@usage [[
---local api = require('Comment.api')
---local config = require('Comment.config'):get()
---
---api.comment.linewise(motion, config?)
---api.comment.linewise.current(motion?, config?)
---api.comment.linewise.count(count, config?)
---
---api.comment.blockwise(motion, config?)
---api.comment.blockwise.current(motion?, config?)
---api.comment.blockwise.count(count, config?)
---@usage ]]
api.comment = setmetatable({ cmode = U.cmode.comment }, core)

---@tag comment.api.uncomment.linewise
---@tag comment.api.uncomment.blockwise
---Provides API to (only) uncomment a region, on current-line, or with a
---count using line or block comment string.
---
---Every function takes a {motion} argument, except '*.count()' function which
---takes an {count} argument, and an optional {config} parameter.
---@type table A metatable containing API functions
---@see comment.opfunc.OpMotion
---@see comment.config
---@usage [[
---local api = require('Comment.api')
---local config = require('Comment.config'):get()
---
---api.uncomment.linewise(motion, config?)
---api.uncomment.linewise.current(motion?, config?)
---api.uncomment.linewise.count(count, config?)
---
---api.uncomment.blockwise(motion, config?)
---api.uncomment.blockwise.current(motion?, config?)
---api.uncomment.blockwise.count(count, config?)
---@usage ]]
api.uncomment = setmetatable({ cmode = U.cmode.uncomment }, core)

---Provides API to to insert comment on previous, next or at the end-of-line.
---Every function takes an optional {config} parameter.
---@type table A metatable containing API functions
---@see comment.config
---@usage [[
---local api = require('Comment.api')
---local config = require('Comment.config'):get()
---
---api.insert.linewise.above(config?)
---api.insert.linewise.below(config?)
---api.insert.linewise.eol(config?)
---
---api.insert.blockwise.above(config?)
---api.insert.blockwise.below(config?)
---api.insert.blockwise.eol(config?)
---@usage ]]
api.insert = setmetatable({}, {
    __index = function(_, ctype)
        return {
            above = function(cfg)
                U.catch(Ex.insert_above, U.ctype[ctype], cfg or Config:get())
            end,
            below = function(cfg)
                U.catch(Ex.insert_below, U.ctype[ctype], cfg or Config:get())
            end,
            eol = function(cfg)
                U.catch(Ex.insert_eol, U.ctype[ctype], cfg or Config:get())
            end,
        }
    end,
})

---Wraps the given API function with 'lockmarks' to preserve marks/jumps
---@param cb string Name of API function
---@return fun(motion:OpMotion) #Callback function
---@see lockmarks
---@see comment.opfunc.OpMotion
---@usage [[
---local api = require('Comment.api')
---
---vim.keymap.set(
---    'n', '<leader>c', api.locked('toggle.linewise.current')
---)
---
---local esc = vim.api.nvim_replace_termcodes(
---    '<ESC>', true, false, true
---)
---vim.keymap.set('x', '<leader>c', function()
---    vim.api.nvim_feedkeys(esc, 'nx', false)
---    api.locked('toggle.linewise')(vim.fn.visualmode())
---end)
---
----- NOTE: \`locked\` method is just a wrapper around \`lockmarks\`
---vim.api.nvim_command([[
---    lockmarks lua require('Comment.api').toggle.linewise.current()
---]])
---@usage ]]
function api.locked(cb)
    return function(motion)
        return A.nvim_command(
            ('lockmarks lua require("Comment.api").%s(%s)'):format(cb, motion and ('%q'):format(motion))
        )
    end
end

---Callback function which does the following
---  1. Sets 'operatorfunc' for dot-repeat
---  2. Preserves jumps and marks
---  3. Stores last cursor position
---@param cb string Name of the API function to call
---@param op '"g@"'|'"g@$"' Operator-mode expression
---@return fun():string #Keymap RHS callback
---@see g@
---@see operatorfunc
---@usage [[
---local api = require('Comment.api')
---vim.keymap.set(
---    'n', 'gc', api.call('toggle.linewise', 'g@'),
---    { expr = true }
---)
---vim.keymap.set(
---    'n', 'gcc', api.call('toggle.linewise.current', 'g@$'),
---    { expr = true }
---)
---@usage ]]
function api.call(cb, op)
    return function()
        A.nvim_set_option('operatorfunc', ("v:lua.require'Comment.api'.locked'%s'"):format(cb))
        Config.position = Config:get().sticky and A.nvim_win_get_cursor(0) or nil
        return op
    end
end

return api
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/config.lua",size:3841,text:`---@mod comment.config Configuration
---@tag comment.config.defaults
---@brief [[
---Following is the default config for the |comment.usage.setup|. If you want to
---override, just modify the option that you want, then it will be merged with the
---default config.
--->lua
---  {
---      padding = true,
---      sticky = true,
---      ignore = nil,
---      toggler = { line = 'gcc', block = 'gbc' },
---      opleader = { line = 'gc', block = 'gb' },
---      extra = { above = 'gcO', below = 'gco', eol = 'gcA' },
---      mappings = { basic = true, extra = true },
---      pre_hook = nil,
---      post_hook = nil,
---  }
---<
---@brief ]]

---Plugin's configuration
---@class CommentConfig
---Controls space between the comment
---and the line (default: 'true')
---@field padding boolean|fun():boolean
---Whether cursor should stay at the
---same position. Only works in NORMAL
---mode mappings (default: 'true')
---@field sticky boolean
---Lua pattern used to ignore lines
---during (un)comment (default: 'nil')
---@field ignore string|fun():string
---Enables |comment.keybindings|
---NOTE: If given 'false', then the
---plugin won't create any mappings
---@field mappings Mappings|false
---@field toggler Toggler See |comment.config.Toggler|
---@field opleader Opleader See |comment.config.Opleader|
---@field extra ExtraMapping See |comment.config.ExtraMapping|
---Function to call before (un)comment.
---It is called with a {ctx} argument
---of type |comment.utils.CommentCtx|
---(default: 'nil')
---@field pre_hook fun(c: CommentCtx): string
---Function to call after (un)comment.
---It is called with a {ctx} argument
---of type |comment.utils.CommentCtx|
---(default: 'nil')
---@field post_hook fun(c: CommentCtx)

---Create default mappings
---@class Mappings
---Enables operator-pending mapping; \`gcc\`, \`gbc\`,
---\`gc{motion}\` and \`gb{motion}\` (default: 'true')
---@field basic boolean
---Enable extra mapping; \`gco\`, \`gcO\` and \`gcA\`
---(default: 'true')
---@field extra boolean

---LHS of toggle mappings in NORMAL
---@class Toggler
---@field line string Linewise comment (default: 'gcc')
---@field block string Blockwise comment (default: 'gbc')

---LHS of operator-mode mappings in NORMAL and VISUAL mode
---@class Opleader
---@field line string Linewise comment (default: 'gc')
---@field block string Blockwise comment (default: 'gb')

---LHS of extra mappings
---@class ExtraMapping
---@field below string Inserts comment below (default: 'gco')
---@field above string Inserts comment above (default: 'gcO')
---@field eol string Inserts comment at the end of line (default: 'gcA')

---@private
---@class RootConfig
---@field config CommentConfig
---@field position? integer[] To be used to restore cursor position
local Config = {
    state = {},
    config = {
        padding = true,
        sticky = true,
        mappings = {
            basic = true,
            extra = true,
        },
        toggler = {
            line = 'gcc',
            block = 'gbc',
        },
        opleader = {
            line = 'gc',
            block = 'gb',
        },
        extra = {
            above = 'gcO',
            below = 'gco',
            eol = 'gcA',
        },
    },
}

---@package
---Updates the default config
---@param cfg? CommentConfig
---@return RootConfig
---@see comment.usage.setup
---@usage \`require('Comment.config'):set({config})\`
function Config:set(cfg)
    if cfg then
        self.config = vim.tbl_deep_extend('force', self.config, cfg)
    end
    return self
end

---Get the config
---@return CommentConfig
---@usage \`require('Comment.config'):get()\`
function Config:get()
    return self.config
end

---@export Config
return setmetatable(Config, {
    __index = function(this, k)
        return this.state[k]
    end,
    __newindex = function(this, k, v)
        this.state[k] = v
    end,
})
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/extra.lua",size:3544,text:`---@mod comment.extra Extra API
---@brief [[
---Underlying functions that powers the |comment.api.insert| lua API.
---@brief ]]

local U = require('Comment.utils')
local A = vim.api

local extra = {}

-- FIXME This prints \`a\` in i_CTRL-o
---Moves the cursor and enters INSERT mode
---@param row integer Starting row
---@param col integer Ending column
local function move_n_insert(row, col)
    A.nvim_win_set_cursor(0, { row, col })
    A.nvim_feedkeys('a', 'ni', true)
end

---@param lnum integer Line index
---@param ctype integer
---@param cfg CommentConfig
local function ins_on_line(lnum, ctype, cfg)
    local row, col = unpack(A.nvim_win_get_cursor(0))

    ---@type CommentCtx
    local ctx = {
        cmode = U.cmode.comment,
        cmotion = U.cmotion.line,
        ctype = ctype,
        range = { srow = row, scol = col, erow = row, ecol = col },
    }

    local srow = row + lnum
    local lcs, rcs = U.parse_cstr(cfg, ctx)
    local padding = U.get_pad(U.is_fn(cfg.padding))

    -- We need RHS of cstr, if we are doing block comments or if RHS exists
    -- because even in line comment RHS do exists for some filetypes like jsx_element, ocaml
    local if_rcs = U.is_empty(rcs) and rcs or padding .. rcs

    A.nvim_buf_set_lines(0, srow, srow, false, { lcs .. padding .. if_rcs })
    A.nvim_win_set_cursor(0, { srow + 1, 0 })
    A.nvim_command('normal! ==')
    move_n_insert(srow + 1, #A.nvim_get_current_line() - #if_rcs - 1)
    U.is_fn(cfg.post_hook, ctx)
end

---Add a comment below the current line and goes to INSERT mode
---@param ctype integer See |comment.utils.ctype|
---@param cfg CommentConfig
function extra.insert_below(ctype, cfg)
    ins_on_line(0, ctype, cfg)
end

---Add a comment above the current line and goes to INSERT mode
---@param ctype integer See |comment.utils.ctype|
---@param cfg CommentConfig
function extra.insert_above(ctype, cfg)
    ins_on_line(-1, ctype, cfg)
end

---Add a comment at the end of current line and goes to INSERT mode
---@param ctype integer See |comment.utils.ctype|
---@param cfg CommentConfig
function extra.insert_eol(ctype, cfg)
    local srow, scol = unpack(A.nvim_win_get_cursor(0))

    ---@type CommentCtx
    local ctx = {
        cmode = U.cmode.comment,
        cmotion = U.cmotion.line,
        ctype = ctype,
        range = { srow = srow, scol = scol, erow = srow, ecol = scol },
    }
    local lcs, rcs = U.parse_cstr(cfg, ctx)

    local line = A.nvim_get_current_line()
    local padding = U.get_pad(U.is_fn(cfg.padding))

    -- We need RHS of cstr, if we are doing block comments or if RHS exists
    -- because even in line comment RHS do exists for some filetypes like jsx_element, ocaml
    local if_rcs = U.is_empty(rcs) and rcs or padding .. rcs

    local ecol
    if U.is_empty(line) then
        -- If line is empty, start comment at the correct indentation level
        A.nvim_set_current_line(lcs .. padding .. if_rcs)
        A.nvim_command('normal! ==')
        ecol = #A.nvim_get_current_line() - #if_rcs - 1
    else
        -- NOTE:
        -- 1. Python is the only language that recommends 2 spaces between the statement and the comment
        -- 2. Other than that, I am assuming that the users wants a space b/w the end of line and start of the comment
        local space = vim.bo.filetype == 'python' and '  ' or ' '
        local ll = line .. space .. lcs .. padding
        A.nvim_set_current_line(ll .. if_rcs)
        ecol = #ll - 1
    end

    move_n_insert(srow, ecol)
    U.is_fn(cfg.post_hook, ctx)
end

return extra
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/ft.lua",size:9427,text:`---@mod comment.ft Language/Filetype detection
---@brief [[
---This module is the core of filetype and commentstring detection and uses the
---|lua-treesitter| APIs to accurately detect filetype and gives the corresponding
---commentstring, stored inside the plugin, for the filetype/langauge.
---
---Compound (dot-separated) filetypes are also supported i.e. 'ansible.yaml',
---'ios.swift' etc. The commentstring resolution will be done from left to right.
---For example, If the filetype is 'ansible.yaml' then 'ansible' commenstring will
---be used if found otherwise it'll fallback to 'yaml'. Read \`:h 'filetype'\`
---@brief ]]

local A = vim.api

---Common commentstring shared b/w multiple languages
local M = {
    cxx_l = '//%s',
    cxx_b = '/*%s*/',
    dbl_hash = '##%s',
    dash = '--%s',
    dash_bracket = '--[[%s]]',
    handlebars = '{{!--%s--}}',
    hash = '#%s',
    hash_bracket = '#[[%s]]',
    haskell_b = '{-%s-}',
    fsharp_b = '(*%s*)',
    html = '<!--%s-->',
    latex = '%%s',
    semicolon = ';%s',
    lisp_l = ';;%s',
    lisp_b = '#|%s|#',
    twig = '{#%s#}',
    vim = '"%s',
    lean_b = '/-%s-/',
}

---Lang table that contains commentstring (linewise/blockwise) for multiple filetypes
---Structure = { filetype = { linewise, blockwise } }
---@type table<string,string[]>
local L = setmetatable({
    arduino = { M.cxx_l, M.cxx_b },
    applescript = { M.hash },
    astro = { M.html },
    autohotkey = { M.semicolon, M.cxx_b },
    bash = { M.hash },
    beancount = { M.semicolon },
    bib = { M.latex },
    c = { M.cxx_l, M.cxx_b },
    cabal = { M.dash },
    cmake = { M.hash, M.hash_bracket },
    conf = { M.hash },
    conkyrc = { M.dash, M.dash_bracket },
    coq = { M.fsharp_b },
    cpp = { M.cxx_l, M.cxx_b },
    cs = { M.cxx_l, M.cxx_b },
    css = { M.cxx_b, M.cxx_b },
    cuda = { M.cxx_l, M.cxx_b },
    dart = { M.cxx_l, M.cxx_b },
    dhall = { M.dash, M.haskell_b },
    dosbatch = { 'REM%s' },
    dot = { M.cxx_l, M.cxx_b },
    dts = { M.cxx_l, M.cxx_b },
    editorconfig = { M.hash },
    eelixir = { M.html, M.html },
    elixir = { M.hash },
    elm = { M.dash, M.haskell_b },
    elvish = { M.hash },
    faust = { M.cxx_l, M.cxx_b },
    fennel = { M.semicolon },
    fish = { M.hash },
    func = { M.lisp_l },
    fsharp = { M.cxx_l, M.fsharp_b },
    gdb = { M.hash },
    gdscript = { M.hash },
    gitignore = { M.hash },
    gleam = { M.cxx_l },
    glsl = { M.cxx_l, M.cxx_b },
    gnuplot = { M.hash, M.hash_bracket },
    go = { M.cxx_l, M.cxx_b },
    gomod = { M.cxx_l },
    graphql = { M.hash },
    groovy = { M.cxx_l, M.cxx_b },
    handlebars = { M.handlebars, M.handlebars },
    haskell = { M.dash, M.haskell_b },
    haxe = { M.cxx_l, M.cxx_b },
    heex = { M.html, M.html },
    html = { M.html, M.html },
    htmldjango = { M.html, M.html },
    idris = { M.dash, M.haskell_b },
    idris2 = { M.dash, M.haskell_b },
    ini = { M.hash },
    java = { M.cxx_l, M.cxx_b },
    javascript = { M.cxx_l, M.cxx_b },
    javascriptreact = { M.cxx_l, M.cxx_b },
    jsonc = { M.cxx_l },
    jsonnet = { M.cxx_l, M.cxx_b },
    julia = { M.hash, '#=%s=#' },
    kotlin = { M.cxx_l, M.cxx_b },
    lean = { M.dash, M.lean_b },
    lean3 = { M.dash, M.lean_b },
    lidris = { M.dash, M.haskell_b },
    lilypond = { M.latex, '%{%s%}' },
    lisp = { M.lisp_l, M.lisp_b },
    lua = { M.dash, M.dash_bracket },
    luau = { M.dash, M.dash_bracket },
    markdown = { M.html, M.html },
    make = { M.hash },
    mbsyncrc = { M.dbl_hash },
    mermaid = { '%%%s' },
    meson = { M.hash },
    nextflow = { M.cxx_l, M.cxx_b },
    nim = { M.hash, '#[%s]#' },
    nix = { M.hash, M.cxx_b },
    nu = { M.hash },
    ocaml = { M.fsharp_b, M.fsharp_b },
    odin = { M.cxx_l, M.cxx_b },
    plantuml = { "'%s", "/'%s'/" },
    purescript = { M.dash, M.haskell_b },
    python = { M.hash }, -- Python doesn't have block comments
    php = { M.cxx_l, M.cxx_b },
    prisma = { M.cxx_l },
    proto = { M.cxx_l, M.cxx_b },
    quarto = { M.html, M.html },
    r = { M.hash }, -- R doesn't have block comments
    racket = { M.lisp_l, M.lisp_b },
    rasi = { M.cxx_l, M.cxx_b },
    readline = { M.hash },
    rego = { M.hash },
    remind = { M.hash },
    rescript = { M.cxx_l, M.cxx_b },
    robot = { M.hash }, -- Robotframework doesn't have block comments
    ron = { M.cxx_l, M.cxx_b },
    ruby = { M.hash },
    rust = { M.cxx_l, M.cxx_b },
    sbt = { M.cxx_l, M.cxx_b },
    scala = { M.cxx_l, M.cxx_b },
    scheme = { M.lisp_l, M.lisp_b },
    sh = { M.hash },
    solidity = { M.cxx_l, M.cxx_b },
    supercollider = { M.cxx_l, M.cxx_b },
    sql = { M.dash, M.cxx_b },
    stata = { M.cxx_l, M.cxx_b },
    svelte = { M.html, M.html },
    swift = { M.cxx_l, M.cxx_b },
    sxhkdrc = { M.hash },
    tablegen = { M.cxx_l, M.cxx_b },
    teal = { M.dash, M.dash_bracket },
    terraform = { M.hash, M.cxx_b },
    tex = { M.latex },
    template = { M.dbl_hash },
    tmux = { M.hash },
    toml = { M.hash },
    twig = { M.twig, M.twig },
    typescript = { M.cxx_l, M.cxx_b },
    typescriptreact = { M.cxx_l, M.cxx_b },
    typst = { M.cxx_l, M.cxx_b },
    v = { M.cxx_l, M.cxx_b },
    verilog = { M.cxx_l },
    vhdl = { M.dash },
    vim = { M.vim },
    vifm = { M.vim },
    vue = { M.html, M.html },
    xdefaults = { '!%s' },
    xml = { M.html, M.html },
    xonsh = { M.hash }, -- Xonsh doesn't have block comments
    yaml = { M.hash },
    yuck = { M.lisp_l },
    zig = { M.cxx_l }, -- Zig doesn't have block comments
}, {
    -- Support for compound filetype i.e. 'ios.swift', 'ansible.yaml' etc.
    __index = function(this, k)
        local base, fallback = string.match(k, '^(.-)%.(.*)')
        if not (base or fallback) then
            return nil
        end
        return this[base] or this[fallback]
    end,
})

local ft = {}

---Sets a commentstring(s) for a filetype/language
---@param lang string Filetype/Language of the buffer
---@param val string|string[]
---@return table self Returns itself
---@usage [[
---local ft = require('Comment.ft')
---
-----1. Using method signature
----- Set only line comment or both
----- You can also chain the set calls
---ft.set('yaml', '#%s').set('javascript', {'//%s', '/*%s*/'})
---
----- 2. Metatable magic
---ft.javascript = {'//%s', '/*%s*/'}
---ft.yaml = '#%s'
---
----- 3. Multiple filetypes
---ft({'go', 'rust'}, {'//%s', '/*%s*/'})
---ft({'toml', 'graphql'}, '#%s')
---@usage ]]
function ft.set(lang, val)
    L[lang] = type(val) == 'string' and { val } or val --[[ @as string[] ]]
    return ft
end

---Get line/block/both commentstring(s) for a given filetype
---@param lang string Filetype/Language of the buffer
---@param ctype? integer See |comment.utils.ctype|. If given \`nil\`, it'll
---return a copy of { line, block } commentstring.
---@return nil|string|string[] #Returns stored commentstring
---@usage [[
---local ft = require('Comment.ft')
---local U = require('Comment.utils')
---
----- 1. Primary filetype
---ft.get('rust', U.ctype.linewise) -- \`//%s\`
---ft.get('rust') -- \`{ '//%s', '/*%s*/' }\`
---
----- 2. Compound filetype
----- NOTE: This will return \`yaml\` commenstring(s),
-----       as \`ansible\` commentstring is not found.
---ft.get('ansible.yaml', U.ctype.linewise) -- \`#%s\`
---ft.get('ansible.yaml') -- { '#%s' }
---@usage ]]
function ft.get(lang, ctype)
    local tuple = L[lang]
    if not tuple then
        return nil
    end
    if not ctype then
        return vim.deepcopy(tuple)
    end
    return tuple[ctype]
end

---Get a language tree for a given range by walking the parse tree recursively.
---This uses 'lua-treesitter' API under the hood. This can be used to calculate
---language of a particular region which embedded multiple filetypes like html,
---vue, markdown etc.
---
---NOTE: This ignores \`tree-sitter-comment\` parser, if installed.
---@param tree userdata Parse tree to be walked
---@param range integer[] Range to check
---{start_row, start_col, end_row, end_col}
---@return userdata #Returns a |treesitter-languagetree|
---@see treesitter-languagetree
---@see lua-treesitter-core
---@usage [[
---local ok, parser = pcall(vim.treesitter.get_parser, 0)
---assert(ok, "No parser found!")
---local tree = require('Comment.ft').contains(parser, {0, 0, -1, 0})
---print('Lang:', tree:lang())
---@usage ]]
function ft.contains(tree, range)
    for lang, child in pairs(tree:children()) do
        if lang ~= 'comment' and child:contains(range) then
            return ft.contains(child, range)
        end
    end

    return tree
end

---Calculate commentstring with the power of treesitter
---@param ctx CommentCtx
---@return nil|string #Commentstring
---@see comment.utils.CommentCtx
function ft.calculate(ctx)
    local ok, parser = pcall(vim.treesitter.get_parser, A.nvim_get_current_buf())

    if not ok then
        return ft.get(vim.bo.filetype, ctx.ctype) --[[ @as string ]]
    end

    local lang = ft.contains(parser, {
        ctx.range.srow - 1,
        ctx.range.scol,
        ctx.range.erow - 1,
        ctx.range.ecol,
    }):lang()

    return ft.get(lang, ctx.ctype) or ft.get(vim.bo.filetype, ctx.ctype) --[[ @as string ]]
end

---@export ft
return setmetatable(ft, {
    __newindex = function(this, k, v)
        this.set(k, v)
    end,
    __call = function(this, langs, spec)
        for _, lang in ipairs(langs) do
            this.set(lang, spec)
        end
        return this
    end,
})
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/init.lua",size:5391,text:`---@brief [[
---*comment-nvim.txt*    For Neovim version 0.7           Last change: 2021 July 11
---
---     _____                                     _                _
---    / ____/                                   / /              (_)
---   / /     ___  _ __ ___  _ __ ___   ___ _ __ / /_   _ ____   ___ _ __ ___
---   / /    / _ \\/ '_ \` _ \\/ '_ \` _ \\ / _ \\ '_ \\/ __/ / '_ \\ \\ / / / '_ \` _ \\
---   / /___/ (_) / / / / / / / / / / /  __/ / / / /_ _/ / / \\ V // / / / / / /
---    \\_____\\___//_/ /_/ /_/_/ /_/ /_/\\___/_/ /_/\\__(_)_/ /_/\\_/ /_/_/ /_/ /_/
---
---                    · Smart and Powerful comment plugin ·
---
---@brief ]]

---@toc comment.contents

---@mod comment-nvim Introduction
---@brief [[
---Comment.nvim is a smart and powerful comment plugin for neovim. It supports
---dot-repeat, counts, line ('//') and block ('/* */') comments, and can be used
---with motion and text-objects. It has native integration with |treesitter| to
---support embedded filetypes like html, vue, markdown with codeblocks etc.
---@brief ]]
---@tag comment.dotrepeat
---@brief [[
---Comment.nvim uses |operatorfunc| combined with |g@| to support dot-repeat, and
---various marks i.e., |'[| |']| |'<| |'>| to deduce the region with the {motion}
---argument provided by 'operatorfunc'. See |comment.api.call|
---@brief ]]
---@tag comment.commentstring
---@brief [[
---Comment.nvim picks commentstring, either linewise/blockwise, from one of the
---following places
---
--- 1. 'pre_hook'
---       If a string is returned from this function then it will be used for
---       (un)commenting. See |comment.config|
---
--- 2. |comment.ft|
---       Using the commentstring table inside the plugin (using treesitter).
---       Fallback to |commentstring|, if not found.
---
--- 3. |commentstring| - Neovim's native commentstring for the filetype
---
---Although Comment.nvim supports native 'commentstring' but unfortunately it has
---the least priority. The caveat with this approach is that if someone sets the
---\`commentstring\`, without returning it, from the 'pre_hook' and the current
---filetype also exists in the |comment.ft| then the commenting will be done using
---the string in |comment.ft| instead of using 'commentstring'. To override this
---behavior, you have to manually return the 'commentstring' from 'pre_hook'.
---@brief ]]
---@tag comment.sourcecode
---@brief [[
---Comment.nvim is FOSS and distributed under MIT license. All the source code is
---available at https://github.com/numToStr/Comment.nvim
---@brief ]]

---@mod comment.usage Usage
---@brief [[
---Before using the plugin, you need to call the \`setup()\` function to create the
---default mappings. If you want, you can also override the default configuration
---by giving it a partial 'comment.config.Config' object, it will then be merged
---with the default configuration.
---@brief ]]

local C = {}

---Configures the plugin
---@param config? CommentConfig User configuration
---@return CommentConfig #Returns the modified config
---@see comment.config
---@usage [[
----- Use default configuration
---require('Comment').setup()
---
----- or with custom configuration
---require('Comment').setup({
---    ignore = '^$',
---    toggler = {
---        line = '<leader>cc',
---        block = '<leader>bc',
---    },
---    opleader = {
---        line = '<leader>c',
---        block = '<leader>b',
---    },
---})
---@usage ]]
function C.setup(config)
    local cfg = require('Comment.config'):set(config):get()

    if cfg.mappings then
        local api = require('Comment.api')
        local vvar = vim.api.nvim_get_vvar
        local K = vim.keymap.set

        -- Basic Mappings
        if cfg.mappings.basic then
            -- NORMAL mode mappings
            K('n', cfg.opleader.line, '<Plug>(comment_toggle_linewise)', { desc = 'Comment toggle linewise' })
            K('n', cfg.opleader.block, '<Plug>(comment_toggle_blockwise)', { desc = 'Comment toggle blockwise' })

            K('n', cfg.toggler.line, function()
                return vvar('count') == 0 and '<Plug>(comment_toggle_linewise_current)'
                    or '<Plug>(comment_toggle_linewise_count)'
            end, { expr = true, desc = 'Comment toggle current line' })
            K('n', cfg.toggler.block, function()
                return vvar('count') == 0 and '<Plug>(comment_toggle_blockwise_current)'
                    or '<Plug>(comment_toggle_blockwise_count)'
            end, { expr = true, desc = 'Comment toggle current block' })

            -- VISUAL mode mappings
            K(
                'x',
                cfg.opleader.line,
                '<Plug>(comment_toggle_linewise_visual)',
                { desc = 'Comment toggle linewise (visual)' }
            )
            K(
                'x',
                cfg.opleader.block,
                '<Plug>(comment_toggle_blockwise_visual)',
                { desc = 'Comment toggle blockwise (visual)' }
            )
        end

        -- Extra Mappings
        if cfg.mappings.extra then
            K('n', cfg.extra.below, api.insert.linewise.below, { desc = 'Comment insert below' })
            K('n', cfg.extra.above, api.insert.linewise.above, { desc = 'Comment insert above' })
            K('n', cfg.extra.eol, api.locked('insert.linewise.eol'), { desc = 'Comment insert end of line' })
        end
    end

    return cfg
end

return C
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/opfunc.lua",size:7567,text:`---@mod comment.opfunc Operator-mode API
---@brief [[
---Underlying functions that powers the |comment.api.toggle|, |comment.api.comment|,
---and |comment.api.uncomment| lua API.
---@brief ]]

local U = require('Comment.utils')
local Config = require('Comment.config')
local A = vim.api

local Op = {}

---Vim operator-mode motion enum. Read |:map-operator|
---@alias OpMotion
---| '"line"' # Vertical motion
---| '"char"' # Horizontal motion
---| '"v"' # Visual Block motion
---| '"V"' # Visual Line motion

---Common operatorfunc callback
---This function contains the core logic for comment/uncomment
---@param motion? OpMotion
---If given 'nil', it'll only (un)comment
---the current line
---@param cfg CommentConfig
---@param cmode integer See |comment.utils.cmode|
---@param ctype integer See |comment.utils.ctype|
function Op.opfunc(motion, cfg, cmode, ctype)
    local range = U.get_region(motion)
    local cmotion = motion == nil and U.cmotion.line or U.cmotion[motion]

    -- If we are doing char or visual motion on the same line
    -- then we would probably want block comment instead of line comment
    local is_partial = cmotion == U.cmotion.char or cmotion == U.cmotion.v
    local is_blockx = is_partial and range.srow == range.erow

    local lines = U.get_lines(range)

    -- sometimes there might be a case when there are no lines
    -- like, executing a text object returns nothing
    if U.is_empty(lines) then
        return
    end

    ---@type CommentCtx
    local ctx = {
        cmode = cmode,
        cmotion = cmotion,
        ctype = is_blockx and U.ctype.blockwise or ctype,
        range = range,
    }

    local lcs, rcs = U.parse_cstr(cfg, ctx)

    ---@type OpFnParams
    local params = {
        cfg = cfg,
        lines = lines,
        lcs = lcs,
        rcs = rcs,
        cmode = cmode,
        range = range,
    }

    if motion ~= nil and (is_blockx or ctype == U.ctype.blockwise) then
        ctx.cmode = Op.blockwise(params, is_partial)
    else
        ctx.cmode = Op.linewise(params)
    end

    -- We only need to restore cursor if both sticky and position are available
    -- As this function is also called for visual mapping where we are not storing the position
    --
    -- And I found out that if someone presses \`gc\` but doesn't provide operators and
    -- does visual comments then cursor jumps to previous stored position. Thus the check for visual modes
    if cfg.sticky and Config.position and cmotion ~= U.cmotion.v and cmotion ~= U.cmotion.V then
        A.nvim_win_set_cursor(0, Config.position)
        Config.position = nil
    end

    U.is_fn(cfg.post_hook, ctx)
end

---Line commenting with count
---@param count integer Value of |v:count|
---@param cfg CommentConfig
---@param cmode integer See |comment.utils.cmode|
---@param ctype integer See |comment.utils.ctype|
function Op.count(count, cfg, cmode, ctype)
    local lines, range = U.get_count_lines(count)

    ---@type CommentCtx
    local ctx = {
        cmode = cmode,
        cmotion = U.cmotion.line,
        ctype = ctype,
        range = range,
    }
    local lcs, rcs = U.parse_cstr(cfg, ctx)

    ---@type OpFnParams
    local params = {
        cfg = cfg,
        cmode = ctx.cmode,
        lines = lines,
        lcs = lcs,
        rcs = rcs,
        range = range,
    }

    if ctype == U.ctype.blockwise then
        ctx.cmode = Op.blockwise(params)
    else
        ctx.cmode = Op.linewise(params)
    end

    U.is_fn(cfg.post_hook, ctx)
end

---Operator-mode function parameters
---@class OpFnParams
---@field cfg CommentConfig
---@field cmode integer See |comment.utils.cmode|
---@field lines string[] List of lines
---@field rcs string RHS of commentstring
---@field lcs string LHS of commentstring
---@field range CommentRange

---Line commenting
---@param param OpFnParams
---@return integer _ Returns a calculated comment mode
function Op.linewise(param)
    local pattern = U.is_fn(param.cfg.ignore)
    local padding = U.is_fn(param.cfg.padding)
    local check_comment = U.is_commented(param.lcs, param.rcs, padding)

    -- While commenting a region, there could be lines being both commented and non-commented
    -- So, if any line is uncommented then we should comment the whole block or vise-versa
    local cmode = U.cmode.uncomment

    ---When commenting multiple line, it is to be expected that indentation should be preserved
    ---So, When looping over multiple lines we need to store the indentation of the mininum length (except empty line)
    ---Which will be used to semantically comment rest of the lines
    local min_indent, tabbed = -1, false

    -- If the given cmode is uncomment then we actually don't want to compute the cmode or min_indent
    if param.cmode ~= U.cmode.uncomment then
        for _, line in ipairs(param.lines) do
            -- I wish lua had \`continue\` statement [sad noises]
            if not U.ignore(line, pattern) then
                if cmode == U.cmode.uncomment and param.cmode == U.cmode.toggle and (not check_comment(line)) then
                    cmode = U.cmode.comment
                end

                if not U.is_empty(line) and param.cmode ~= U.cmode.uncomment then
                    local _, len = string.find(line, '^%s*')
                    if min_indent == -1 or min_indent > len then
                        min_indent, tabbed = len, string.find(line, '^\\t') ~= nil
                    end
                end
            end
        end
    end

    -- If the comment mode given is not toggle than force that mode
    if param.cmode ~= U.cmode.toggle then
        cmode = param.cmode
    end

    if cmode == U.cmode.uncomment then
        local uncomment = U.uncommenter(param.lcs, param.rcs, padding)
        for i, line in ipairs(param.lines) do
            if not U.ignore(line, pattern) then
                param.lines[i] = uncomment(line) --[[@as string]]
            end
        end
    else
        local comment = U.commenter(param.lcs, param.rcs, padding, min_indent, nil, tabbed)
        for i, line in ipairs(param.lines) do
            if not U.ignore(line, pattern) then
                param.lines[i] = comment(line) --[[@as string]]
            end
        end
    end

    A.nvim_buf_set_lines(0, param.range.srow - 1, param.range.erow, false, param.lines)

    return cmode
end

---Full/Partial/Current-Line Block commenting
---@param param OpFnParams
---@param partial? boolean Comment the partial region (visual mode)
---@return integer _ Returns a calculated comment mode
function Op.blockwise(param, partial)
    local is_x = #param.lines == 1 -- current-line blockwise
    local lines = is_x and param.lines[1] or param.lines

    local padding = U.is_fn(param.cfg.padding)

    local scol, ecol = nil, nil
    if is_x or partial then
        scol, ecol = param.range.scol, param.range.ecol
    end

    -- If given mode is toggle then determine whether to comment or not
    local cmode = param.cmode
    if cmode == U.cmode.toggle then
        local is_cmt = U.is_commented(param.lcs, param.rcs, padding, scol, ecol)(lines)
        cmode = is_cmt and U.cmode.uncomment or U.cmode.comment
    end

    if cmode == U.cmode.uncomment then
        lines = U.uncommenter(param.lcs, param.rcs, padding, scol, ecol)(lines)
    else
        lines = U.commenter(param.lcs, param.rcs, padding, scol, ecol)(lines)
    end

    if is_x then
        A.nvim_set_current_line(lines)
    else
        A.nvim_buf_set_lines(0, param.range.srow - 1, param.range.erow, false, lines)
    end

    return cmode
end

return Op
`},{name:"/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/utils.lua",size:12965,text:`---@mod comment.utils Utilities

local F = require('Comment.ft')
local A = vim.api

local U = {}

---Comment context
---@class CommentCtx
---@field ctype integer See |comment.utils.ctype|
---@field cmode integer See |comment.utils.cmode|
---@field cmotion integer See |comment.utils.cmotion|
---@field range CommentRange

---Range of the selection that needs to be commented
---@class CommentRange
---@field srow integer Starting row
---@field scol integer Starting column
---@field erow integer Ending row
---@field ecol integer Ending column

---Comment modes - Can be manual or computed via operator-mode
---@class CommentMode
---@field toggle integer Toggle action
---@field comment integer Comment action
---@field uncomment integer Uncomment action

---An object containing comment modes
---@type CommentMode
U.cmode = {
    toggle = 0,
    comment = 1,
    uncomment = 2,
}

---Comment types
---@class CommentType
---@field linewise integer Use linewise commentstring
---@field blockwise integer Use blockwise commentstring

---An object containing comment types
---@type CommentType
U.ctype = {
    linewise = 1,
    blockwise = 2,
}

---Comment motion types
---@class CommentMotion
---@field line integer Line motion (ie. 'gc2j')
---@field char integer Character/left-right motion (ie. 'gc2w')
---@field block integer Visual operator-pending motion
---@field v integer Visual motion (ie. 'v3jgc')
---@field V integer Visual-line motion (ie. 'V10kgc')

---An object containing comment motions
---@type CommentMotion
U.cmotion = {
    line = 1,
    char = 2,
    block = 3,
    v = 4,
    V = 5,
}

---@private
---Check whether the line is empty
---@param iter string|string[]
---@return boolean
function U.is_empty(iter)
    return #iter == 0
end

---@private
---Helper to get padding character
---@param flag boolean
---@return string string
function U.get_pad(flag)
    return flag and ' ' or ''
end

---@private
---Helper to get padding pattern
---@param flag boolean
---@return string string
function U.get_padpat(flag)
    return flag and '%s?' or ''
end

---@private
---Call a function if exists
---@param fn unknown|fun(...):unknown Wanna be function
---@return unknown
function U.is_fn(fn, ...)
    if type(fn) == 'function' then
        return fn(...)
    end
    return fn
end

---@private
---Check if the given line is ignored or not with the given pattern
---@param ln string Line to be ignored
---@param pat string Lua regex
---@return boolean
function U.ignore(ln, pat)
    return pat and string.find(ln, pat) ~= nil
end

---Get region for line movement or visual selection
---NOTE: Returns the current line region, if \`opmode\` is not given.
---@param opmode? OpMotion
---@return CommentRange
function U.get_region(opmode)
    if not opmode then
        local row = unpack(A.nvim_win_get_cursor(0))
        return { srow = row, scol = 0, erow = row, ecol = 0 }
    end

    local marks = string.match(opmode, '[vV]') and { '<', '>' } or { '[', ']' }
    local sln, eln = A.nvim_buf_get_mark(0, marks[1]), A.nvim_buf_get_mark(0, marks[2])

    return { srow = sln[1], scol = sln[2], erow = eln[1], ecol = eln[2] }
end

---Get lines from the current position to the given count
---@param count integer Probably 'vim.v.count'
---@return string[] #List of lines
---@return CommentRange
function U.get_count_lines(count)
    local srow = unpack(A.nvim_win_get_cursor(0))
    local erow = (srow + count) - 1
    local lines = A.nvim_buf_get_lines(0, srow - 1, erow, false)

    return lines, { srow = srow, scol = 0, erow = erow, ecol = 0 }
end

---Get lines from a NORMAL/VISUAL mode
---@param range CommentRange
---@return string[] #List of lines
function U.get_lines(range)
    -- If start and end is same, then just return the current line
    if range.srow == range.erow then
        return { A.nvim_get_current_line() }
    end

    return A.nvim_buf_get_lines(0, range.srow - 1, range.erow, false)
end

---Validates and unwraps the given commentstring
---@param cstr string See 'commentstring'
---@return string string Left side of the commentstring
---@return string string Right side of the commentstring
function U.unwrap_cstr(cstr)
    local left, right = string.match(cstr, '(.*)%%s(.*)')

    assert(
        (left or right),
        { msg = string.format('Invalid commentstring for %s! Read \`:h commentstring\` for help.', vim.bo.filetype) }
    )

    return vim.trim(left), vim.trim(right)
end

---Parses commentstring from the following places in the respective order
---  1. pre_hook - commentstring returned from the function
---  2. ft.lua - commentstring table bundled with the plugin
---  3. commentstring - Neovim's native. See 'commentstring'
---@param cfg CommentConfig
---@param ctx CommentCtx
---@return string string Left side of the commentstring
---@return string string Right side of the commentstring
function U.parse_cstr(cfg, ctx)
    -- 1. We ask \`pre_hook\` for a commentstring
    local inbuilt = U.is_fn(cfg.pre_hook, ctx)
        -- 2. Calculate w/ the help of treesitter
        or F.calculate(ctx)

    assert(inbuilt or (ctx.ctype ~= U.ctype.blockwise), {
        msg = vim.bo.filetype .. " doesn't support block comments!",
    })

    -- 3. Last resort to use native commentstring
    return U.unwrap_cstr(inbuilt or vim.bo.commentstring)
end

---Returns a closure which is used to do comments
---
---If given {string[]} to the closure then it will do blockwise comment
---else linewise comment will be done with the given {string}
---@param left string Left side of the commentstring
---@param right string Right side of the commentstring
---@param padding boolean Is padding enabled?
---@param scol? integer Starting column
---@param ecol? integer Ending column
---@param tabbed? boolean Using tab indentation
---@return fun(line: string|string[]):string|string[]
function U.commenter(left, right, padding, scol, ecol, tabbed)
    local pad = U.get_pad(padding)
    local ll = U.is_empty(left) and left or (left .. pad)
    local rr = U.is_empty(right) and right or (pad .. right)
    local empty = string.rep(tabbed and '\\t' or ' ', scol or 0) .. left .. right
    local is_lw = scol and not ecol

    return function(line)
        ------------------
        -- for linewise --
        ------------------
        if is_lw then
            if U.is_empty(line) then
                return empty
            end
            -- line == 0 -> start from 0 col
            if scol == 0 then
                return (ll .. line .. rr)
            end
            local first = string.sub(line --[[@as string]], 0, scol)
            local last = string.sub(line --[[@as string]], scol + 1, -1)
            return first .. ll .. last .. rr
        end

        -------------------
        -- for blockwise --
        -------------------
        if type(line) == 'table' then
            local first, last = line[1], line[#line]
            -- If both columns are given then we can assume it's a partial block
            if scol and ecol then
                local sfirst = string.sub(first, 0, scol)
                local slast = string.sub(first, scol + 1, -1)
                local efirst = string.sub(last, 0, ecol + 1)
                local elast = string.sub(last, ecol + 2, -1)
                line[1] = sfirst .. ll .. slast
                line[#line] = efirst .. rr .. elast
            else
                line[1] = U.is_empty(first) and left or string.gsub(first, '^(%s*)', '%1' .. vim.pesc(ll))
                line[#line] = U.is_empty(last) and right or (last .. rr)
            end
            return line
        end

        --------------------------------
        -- for current-line blockwise --
        --------------------------------
        -- SOURCE: https://github.com/numToStr/Comment.nvim/issues/224
        if ecol > #line then
            return ll .. line .. rr
        end
        local first = string.sub(line, 0, scol)
        local mid = string.sub(line, scol + 1, ecol + 1)
        local last = string.sub(line, ecol + 2, -1)
        return first .. ll .. mid .. rr .. last
    end
end

---Returns a closure which is used to uncomment a line
---
---If given {string[]} to the closure then it will block uncomment
---else linewise uncomment will be done with the given {string}
---@param left string Left side of the commentstring
---@param right string Right side of the commentstring
---@param padding boolean Is padding enabled?
---@param scol? integer Starting column
---@param ecol? integer Ending column
---@return fun(line: string|string[]):string|string[]
function U.uncommenter(left, right, padding, scol, ecol)
    local pp, plen = U.get_padpat(padding), padding and 1 or 0
    local left_len, right_len = #left + plen, #right + plen
    local ll = U.is_empty(left) and left or vim.pesc(left) .. pp
    local rr = U.is_empty(right) and right or pp .. vim.pesc(right)
    local is_lw = not (scol and scol)
    local pattern = is_lw and '^(%s*)' .. ll .. '(.-)' .. rr .. '$' or ''

    return function(line)
        -------------------
        -- for blockwise --
        -------------------
        if type(line) == 'table' then
            local first, last = line[1], line[#line]
            -- If both columns are given then we can assume it's a partial block
            if scol and ecol then
                local sfirst = string.sub(first, 0, scol)
                local slast = string.sub(first, scol + left_len + 1, -1)
                local efirst = string.sub(last, 0, ecol - right_len + 1)
                local elast = string.sub(last, ecol + 2, -1)
                line[1] = sfirst .. slast
                line[#line] = efirst .. elast
            else
                line[1] = string.gsub(first, '^(%s*)' .. ll, '%1')
                line[#line] = string.gsub(last, rr .. '$', '')
            end
            return line
        end

        ------------------
        -- for linewise --
        ------------------
        if is_lw then
            local a, b, c = string.match(line, pattern)
            -- When user tries to uncomment when there is nothing to uncomment. See #221
            assert(a and b, { msg = 'Nothing to uncomment!' })
            -- If there is nothing after LHS then just return ''
            -- bcz the line previously (before comment) was empty
            return U.is_empty(b) and b or a .. b .. (c or '')
        end

        --------------------------------
        -- for current-line blockwise --
        --------------------------------
        -- SOURCE: https://github.com/numToStr/Comment.nvim/issues/224
        if ecol > #line then
            return string.sub(line, scol + left_len + 1, #line - right_len)
        end
        local first = string.sub(line, 0, scol)
        local mid = string.sub(line, scol + left_len + 1, ecol - right_len + 1)
        local last = string.sub(line, ecol + 2, -1)
        return first .. mid .. last
    end
end

---Check if the given string is commented or not
---
---If given {string[]} to the closure, it will check the first and last line
---with LHS and RHS of commentstring respectively else it will check the given
---line with LHS and RHS (if given) of the commenstring
---@param left string Left side of the commentstring
---@param right string Right side of the commentstring
---@param padding boolean Is padding enabled?
---@param scol? integer Starting column
---@param ecol? integer Ending column
---@return fun(line: string|string[]):boolean
function U.is_commented(left, right, padding, scol, ecol)
    local pp = U.get_padpat(padding)
    local ll = U.is_empty(left) and left or '^%s*' .. vim.pesc(left) .. pp
    local rr = U.is_empty(right) and right or pp .. vim.pesc(right) .. '$'
    local pattern = ll .. '.-' .. rr
    local is_full = scol == nil or ecol == nil

    return function(line)
        -------------------
        -- for blockwise --
        -------------------
        if type(line) == 'table' then
            local first, last = line[1], line[#line]
            if is_full then
                return (string.find(first, ll) and string.find(last, rr)) ~= nil
            end
            return (string.find(string.sub(first, scol + 1, -1), ll) and string.find(string.sub(last, 0, ecol + 1), rr))
                ~= nil
        end

        ------------------
        -- for linewise --
        ------------------
        if is_full then
            return string.find(line, pattern) ~= nil
        end

        --------------------------------
        -- for current-line blockwise --
        --------------------------------
        -- SOURCE: https://github.com/numToStr/Comment.nvim/issues/224
        return string.find(string.sub(line, scol + 1, (ecol > #line and #line or ecol + 1)), pattern) ~= nil
    end
end

---@private
---Error handler
---@param ... unknown
function U.catch(fn, ...)
    xpcall(fn, function(err)
        vim.notify(string.format('[Comment.nvim] %s', err.msg), vim.log.levels.WARN)
    end, ...)
end

return U
`}],V=["/home/kdog3682/.config/nvim/lua/lazy-setup.lua","/home/kdog3682/.config/nvim/lua/config/more/keymaps.lua","/home/kdog3682/.config/nvim/lua/config/more/snippets.lua","/home/kdog3682/.config/nvim/lua/config/more/lua.lua","/home/kdog3682/.config/nvim/lua/config/snippets/lua.lua","/home/kdog3682/.config/nvim/lua/config/keymaps.lua","/home/kdog3682/.config/nvim/lua/config/autocmds.lua","/home/kdog3682/.config/nvim/lua/config/init.lua","/home/kdog3682/.config/nvim/lua/config/options.lua","/home/kdog3682/.config/nvim/lua/plugins/autopairs.lua","/home/kdog3682/.config/nvim/lua/plugins/dressing.lua","/home/kdog3682/.config/nvim/lua/plugins/colorscheme.lua","/home/kdog3682/.config/nvim/lua/plugins/fzf.lua","/home/kdog3682/.config/nvim/lua/plugins/nvim-treesitter.lua","/home/kdog3682/.config/nvim/lua/plugins/lsp.lua","/home/kdog3682/.config/nvim/lua/claude-nightfox.lua","/home/kdog3682/.config/nvim/lua/local-plugins/nvim-grey/LICENSE","/home/kdog3682/.config/nvim/lua/local-plugins/nvim-grey/README.md","/home/kdog3682/.config/nvim/lua/local-plugins/nvim-grey/colors/grey.lua","/home/kdog3682/.config/nvim/lua/local-plugins/nvim-grey/stylua.toml","/home/kdog3682/.config/nvim/lua/local-plugins/comment/LICENSE","/home/kdog3682/.config/nvim/lua/local-plugins/comment/README.md","/home/kdog3682/.config/nvim/lua/local-plugins/comment/doc/API.md","/home/kdog3682/.config/nvim/lua/local-plugins/comment/doc/Comment.txt","/home/kdog3682/.config/nvim/lua/local-plugins/comment/doc/plugs.md","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/api.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/config.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/extra.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/ft.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/init.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/opfunc.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/lua/Comment/utils.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/plugin/Comment.lua","/home/kdog3682/.config/nvim/lua/local-plugins/comment/stylua.toml","/home/kdog3682/.config/nvim/lua/stdlib/meta.lua","/home/kdog3682/.config/nvim/lua/snippets/lua.lua","/home/kdog3682/.config/nvim/lazy-lock.json","/home/kdog3682/.config/nvim/init.lua"],F=[["br","--------------------------------"],["semi",";"],["lt",".log(files);"],["sn","'\\n'"],["snsn","'\\n\\n'"],["ls","(s)"],["lxi","(x,i)"],["rto","{recursive:"],["pi","/*"],["bc","/*"],["pi","/*"],["pi","/*"],["tdb","`"],["td","``"],["pe","+="],["ae","addExtension()"],["af","Array.from()"],["ar","Array.from() "],["a2","assertion2()"],["slp","await sleep(500)"],["brow","browserChalk()"],["lb","console.browser()"],["lt","console.log();"],["la","console.log(arguments)"],["fli","FindLineIndex('')"],["ge","getExtension()"],["hop","hasOwnProperty()"],["isa","isArray() ? "],["isf","isFunction() ? "],["iso","isObject() ? "],["iss","isString() ? "],["mc","mapChildren(n,"],["na","node.assign()"],["oa","Object.assign()"],["oe","Object.entries()"],["ok","Object.keys()"],["ov","Object.values()"],["rnp","randomPick()"],["rp","randomPick()"],["re","RegExp()"],["reg","RegExp(``)"],["rv","return value"],["srep","s.replace()"],["sd5","smartDedent5()"],["sd","smartDedent5()"],["tj","toJSON()"],["tlc","toLowerCase()"],["ts","toString()"],["uni","unique()"]],z=`hi this is *markdown*
`,H=`hi this is text from abc.txt
`,B=i("h1",null,"This is the cart page",-1),W={key:0},K=["onClick"],D={key:1},G=["src"],$=i("h2",null,"There is nothing in your cart",-1),Z={__name:"PiniaCartView",setup(h){function a(p){switch(p){case"images":return m(Object.assign({"../resources/images/Screenshot 2024-02-23 5.37.34 PM.png":C,"../resources/images/Screenshot 2024-03-29 7.23.56 PM.png":U,"../resources/images/Screenshot 2024-03-29 7.24.15 PM.png":A,"../resources/images/Screenshot 2024-03-29 7.24.41 PM.png":S,"../resources/images/Screenshot 2024-03-29 7.24.50 PM.png":P,"../resources/images/Screenshot 2024-03-29 7.25.01 PM.png":I,"../resources/images/Screenshot 2024-03-29 7.25.12 PM.png":O,"../resources/images/Screenshot 2024-03-29 7.25.25 PM.png":R,"../resources/images/Screenshot 2024-04-03 10.31.08 PM.png":E,"../resources/images/greg-rakozy-oMpAz-DN-9I-unsplash.jpg":j,"../resources/images/jordan-wozniak-xP_AGmeEa6s-unsplash.jpg":L,"../resources/images/joseph-barrientos-oQl0eVYd_n8-unsplash.jpg":T,"../resources/images/kirsten-frank-7LDcvZbEPQs-unsplash.jpg":q}));case"data":return m(Object.assign({"../resources/data/comment.json":N,"../resources/data/comment.nvim.json":V,"../resources/data/javascript-inoreab.json":F}));case"raw":return m(Object.assign({"../resources/raw/abc.md":z,"../resources/raw/abc.txt":H}))}}const s=a("images");console.log(s.value);const _=a("raw"),b=a("data"),g=v(),{removeItems:x}=g,{cartItems:Y,sortedItems:u}=w(g);return(p,J)=>(n(),e(l,null,[B,o(u).length>0?(n(),e("main",W,[(n(!0),e(l,null,r(o(u),t=>(n(),e("div",{key:t.id,class:"item"},[i("h1",null,c(t.title),1),i("button",{onClick:X=>o(x)(t.id)},"Remove",8,K)]))),128))])):(n(),e("main",D,[(n(!0),e(l,null,r(o(s),t=>(n(),e("div",null,[i("pre",null,c(t),1),i("img",{src:t},null,8,G)]))),256)),(n(!0),e(l,null,r(o(b),t=>(n(),e("pre",null,c(t),1))),256)),k(" --- "),(n(!0),e(l,null,r(o(_),t=>(n(),e("pre",null,c(t),1))),256)),$]))],64))}},f={};function Q(h,a){const s=Z;return n(),y(s)}typeof d=="function"&&d(f);const ln=M(f,[["render",Q]]);export{ln as default};
