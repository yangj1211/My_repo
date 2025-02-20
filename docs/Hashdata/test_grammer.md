# 自动化文档检查

本章节将介绍如何使用 MkDocs 和 pnpm 来自动化文档检查。包括如何安装、创建文件夹、安装所需的工具以及如何构建和检查文档。

## 1. 安装 MkDocs 和 pnpm

首先，我们需要安装 MkDocs 和 pnpm，并搭建一个基本的文档项目结构。

### 1.1 安装 MkDocs

MkDocs 是一个静态站点生成器，专门用于构建文档。你可以通过 `pip` 安装 MkDocs，也可以使用其他方法（如 Docker 或包管理器）。

```bash
pip install mkdocs
```

或者你也可以使用 Homebrew（如果在 macOS 上）来安装：

```bash
brew install mkdocs
```

安装后，你可以通过运行以下命令来确认是否安装成功：

```bash
mkdocs --version
```

### 1.2 安装 pnpm

pnpm 是一个快速、节省空间的包管理器，类似于 npm 或 yarn。首先安装 pnpm：

```bash
npm install -g pnpm
```

## 2. 初始化项目

接下来，我们将初始化一个 MkDocs 项目和 pnpm 项目。

### 2.1 创建项目文件夹

在终端中，选择你想创建项目的位置，然后执行以下命令来创建一个新的文件夹并进入该文件夹。

```bash
mkdir my-docs-project
cd my-docs-project
```

### 2.2 初始化 MkDocs 项目

在你的项目文件夹中，执行以下命令来初始化一个新的 MkDocs 项目：

```bash
mkdocs new .
```

该命令会在当前文件夹下创建一个基本的 MkDocs 项目结构，包括：

- `mkdocs.yml`：MkDocs 配置文件
- `docs/`：文档目录，默认包含一个 `index.md` 文件
- `site/`：构建输出目录，生成的 HTML 文件将在这里

### 2.3 初始化 pnpm 项目

接下来，我们使用 pnpm 初始化一个新的 npm 项目。这是为了后续管理依赖和脚本。

```bash
pnpm init
```

根据提示填写项目的相关信息，最后会生成一个 `package.json` 文件。

## 3. 安装 markdownlint 和 eslint

为了确保文档的格式正确，我们将安装 `markdownlint`（用于 Markdown 格式检查）和 `eslint`（用于代码的格式检查）。

### 3.1 安装 markdownlint-cli 和 eslint

使用 pnpm 安装以下开发依赖：

```bash
pnpm add -D markdownlint-cli eslint eslint-plugin-markdown
```

这会在你的项目中安装 `markdownlint-cli`、`eslint` 以及 `eslint-plugin-markdown`，后者用于检查 Markdown 文件中的代码块。

## 4. 配置 markdownlint

创建一个 `markdownlint.json` 配置文件，用于配置 Markdown 文件的检查规则。在项目根目录下创建一个 `.markdownlint.json` 文件，并添加以下内容：

```json
{
  "MD013": {
    "line_length": 80
  },
  "MD029": true,
  "MD032": false
}
```

这将配置以下规则：

- `MD013`：行长度限制为 80 字符。
- `MD029`：需要确保列表中的数字是按顺序排列的（例如：1. Item 1, 2. Item 2）。
- `MD032`：false：禁用此规则，表示不会强制要求列表项后面必须有空行。例如，在列表项后可以没有额外的空行。

根据实际情况可以配置更多检查规则，这里只做简单示例。


## 5. 执行文档检查和修复

### 5.1 执行 lint 检查：

运行以下命令，检查项目中的 Markdown 文档是否符合规则：

```
pnpm run lint
```

### 5.2 自动修复文档问题

如果希望修复发现的问题，运行以下命令：

```
pnpm run lint:fix
```

## 6. 使用 MkDocs 构建文档

### 6.1 启动 MkDocs 本地服务器

运行以下命令启动 MkDocs 本地服务器：

```bash
mkdocs serve
```

这会在 `http://127.0.0.1:8000/` 启动一个本地开发服务器，您可以在浏览器中查看实时预览。

### 6.2 构建静态网站

一旦文档准备好，可以使用以下命令将其构建为静态 HTML 文件：

```bash
mkdocs build
```

构建后的文件将存储在 `site/` 文件夹中。

## 总结

现在，你已经成功设置了一个 MkDocs 项目，并使用 pnpm 管理项目依赖。同时，你已经添加了 Markdown 格式检查工具（`markdownlint`）以及自动修复功能。

- **MkDocs** 用于构建文档网站。
- **pnpm** 用于管理依赖。
- **markdownlint** 用于自动化检查和修复 Markdown 文件格式。

这样，你就可以高效地管理和维护文档，确保它们符合预定的格式规范。
