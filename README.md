# Markdown Table of Contents Generator

A small package to generate a table of contents based on the markdown files present in a folder.

## Installation

This package is intended to install as a global script.
In order to install it on your machine run the following command:

```
npm install -g markdown-index-generator
```

## Usage

To use this package run the following command:


```
markdown-index-generator <folder_location> <file_to_add_index>
```


## Example

Suppose you have the following folder with markdown files:

```
folder/
    index.md
    page1.md
    page2.md
```

Also suppose page1.md contains 3 titles inside: *First*, *Second*, *Third*.

To generate the table of contents and add it to *index.md*, run the following command:

```
markdown-index-generator folder index.md
```

As result, it is add the following table of content to *index.md*:

```
## Table of Contents

1. [Page1](/page1)
	1. [First](page1/#first)
	2. [Second](page1/#second)
    3. [Third](page1/#third)
2. [Page2](/page2)
```
