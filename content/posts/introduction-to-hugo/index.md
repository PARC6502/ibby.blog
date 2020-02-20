---
title: An Introduction to Making a Blog With Hugo
cover: ""
date: 2020-02-19
description: This tutorial goes through how to build a basic blog with the hugo tool
tags: ['hugo', 'static site generator', 'web development']
draft: true
---

In this post I'm going to explain how you can build your own blog using a tool called Hugo, which I think is a great alternative to something like Wordpress and site builders like Squarespace or Wix.

Although there's a little bit more of a learning curve compared to using a pre-installed version of wordpress, or a site builder tool, in exchange you get much more control and ownership of your data. You'll also end up with a site that costs a lot less to host.

If you're not very technical I expect you'd wrap your head around the basics in an afternoon or a day. If you're comfortable with running commands on the command line or have used similar tools before you'll probably figure it out a lot quicker.

<!-- omit in toc -->

## Contents 

- [What is Hugo?](#what-is-hugo)
- [Installation](#installation)
  - [Linux](#linux)
  - [Windows](#windows)
  - [MacOS](#macos)
- [Your first hugo page](#your-first-hugo-page)
- [Installing a blog friendly theme](#installing-a-blog-friendly-theme)
- [Adding more content](#adding-more-content)
- [Putting it online](#putting-it-online)
  - [Manually uploading files (FTP or sth)](#manually-uploading-files-ftp-or-sth)
  - [VPS + Caddy + Rsync](#vps--caddy--rsync)

## What is Hugo?

[Hugo](https://gohugo.io/) is a *static site generator*. It's a tool which combines a bunch of files and turns them into HTML, CSS and JavaScript files. Or in other words it uses these files to generate a *static site*. 

Normally the files you write are [*markdown* files](https://www.markdownguide.org/cheat-sheet/) for pages and blog posts, as well as configuration files and HTML templates.

> Markdown is a markup language that much simpler to use and read than HTML. For example typing `**this**` produces bold text like **this**. Much more readable than `<b>this</b>`.

You can think of a static site generator as a compromise between between a static site and a content management system (CMS) like WordPress or Ghost.

### Why not just write HTML, CSS and JavaScript files?

* **Easier to learn**   
  If you're learning from scratch there's a lot less to learn with static site generators. Markdown is a lot easier to pick up than HTML. You can also use preconfigured templates, themes, and starters so it's easier to get started with very little knowledge 
* **Less repetition**   
  With a static HTML site bits that are the same in different pages have to be repeated. For example you have to insert the top menu into every page. If you change the menu, you have to change it in every page. Hugo takes care of that for you. You will only have to change the menu in one place and Hugo will do the rest.
* **Plugins and themes galore!**  
  Hugo makes it very easy to use plugins and themes. Meaning if someone else has figured out the solution to your problem, or made a very pretty blog, you can easily use that.

### Why not use a CMS like WordPress or Ghost?

* **Uses less resources**	

  A content management system runs a lot of code on the server. In comparison, the server for a static site only has to serve the content. This means you can spend less money on the server, more on coffee. Better for your wallet and the environment.

* **Simpler to manage**

  CMS' have a lot of moving parts. If you've ever tried to manage your own wordpress install, you've probably run into database issues, incompatible PHP versions and baffling errors that suddenly appear out of nowhere. It can be hard to figure out where the problem came from with so many moving parts. Not to mention the difficulty of figuring out how to do backups and restores when databases are involved. There's a lot less points of failure with a tool like Hugo, and because of the flat file structure backing up can be as simple as copying the files.

* **Easier access to *your* data**

  If you're not technical and you are using WordPress it can be difficult to interact with your data from outside the administration area. Figuring out where your posts are stored, trying to recover them after a server failure, these can be daunting tasks. Even worse, popular site builders like SquareSpace and Wix don't even offer the functionality to export the site you worked so hard to build. It's *your* data, *your* work, *your* creativity, shouldn't you get to own and control that?

## Installation

On [the Hugo website](https://gohugo.io/getting-started/installing/) there's a big list of all the ways you can install it. I'll go over the basic methods for Linux, Windows and Mac. 

### Linux

You can use `snap` to install Hugo on Linux. Snap comes pre-installed on Ubuntu, and if you're using a distribution based on Ubuntu or Debian you can install snap by opening a terminal and typing the following:

```bash
sudo apt update
sudo apt install snapd
```

Checkout [this page](https://snapcraft.io/docs/installing-snapd) if you need more information about how to install snap on your specific distribution.

After that you can use snap to install Hugo with this command:

```bash
snap install hugo
```

### Windows

This is a complete video guide to installing Hugo.

<Embed
  src="https://www.invidio.us/embed/G7umPCU-8xc"
/>

Or if you prefer text instructions, you first need to head over to [this releases page](https://github.com/gohugoio/hugo/releases) and find the first file that ends in either `Windows-32bit.zip` or `Windows-64bit.zip`. ([Check this page out if you're not sure whether your computer is 32-bit or 64-bit.](https://support.microsoft.com/en-us/help/15056/windows-32-64-bit-faq))

After extracting the zip file, you should find a `hugo.exe` file. In your `C:\` drive, create a folder named `Hugo` and inside that create a folder named `bin`.

Now, copy the `hugo.exe` to `C:\Hugo\bin`. Your file structure should look like this:

```
C:
 └─Hugo
    └─bin
       └─hugo.exe
```

Next you'll need to open the Control Panel, click on `Advanced Setting` then the `Environment Variables` button at the bottom of that tab.

Select the `Path` variable and click edit. Then click the `New` button and type in `C:\Hugo\bin`. After that OK out of all the windows. 

To test it works open the command prompt by clicking the windows key and starting to type the word command, it should appear. 

After opening it, type the following:

```powershell
hugo version
```

If everything is working fine the hugo version should appear.

### MacOS

## Your first hugo page

## Installing a blog friendly theme

## Adding more content

## Putting it online

### Manually uploading files (FTP or sth)

### VPS + Caddy + Rsync (maybe this one can be another tutorial)