# Contributing to Bazaar

:+1::tada: First off, thank you for taking the time to contribute! :tada::+1:

We welcome all feedback on Bazaar, and we wish to 
make contributing as easy as possible for interested
participants. These contributions can include but aren't
limited to: 

- :bug: Reporting a bug
- :speech_balloon: Discussing the current state of the code
- :wrench: Submitting a fix 
- :gift: Proposing new features

To facilitate this, we created the following set of guidelines for contributing to Bazaar Market and our sub-repositories, which can be found under [Bazaar Market](https://github.com/BazaarMarket) on GitHub. 

> These are mostly guidelines, not rules. Use your best judgment, and
> feel free to propose changes to this document in a pull request.

#### Table Of Contents

[Code of Conduct](#code-of-conduct)

[I don't want to read this whole thing, I just have a question!!!](#i-dont-want-to-read-this-whole-thing-i-just-have-a-question)

[What should I know before I get started?](#what-should-i-know-before-i-get-started)

[How Can I Contribute?](#how-can-i-contribute)
  * [Reporting Bugs](#reporting-bugs)
  * [Suggesting Enhancements](#suggesting-enhancements)
  * [Your First Code Contribution](#your-first-code-contribution)
  * [Pull Requests](#pull-requests)

[Styleguides](#styleguides)
  * [Git Commit Messages](#git-commit-messages)
  * [Documentation Styleguide](#documentation-styleguide)

[Resources](#resources)

## Code of Conduct

This project and everyone participating in it is governed by the [Bazaar Code of Conduct](docs/CODE_OF_CONDUCT.md). 
**By participating, you are expected to uphold this code.** 
Please report unacceptable behavior to [bazaarnft@gmail.com](mailto:bazaarnft@gmail.com).

### All contributions adhere to our MIT License
All code changes will be subject to the same [MIT License](http://choosealicense.com/licenses/mit/) that currently covers the project. 
Make sure to keep this in mind when submitting any changes. 

Again, ***by contributing, you agree that your contributions will be licensed under its MIT License.***

## I don't want to read this whole thing I just have a question!!!

> **Note:** ***Please don't file an issue to ask a question.*** You'll get faster results by using the resources below.

We have a [detailed FAQ on our site](https://bazaarnft.xyz), as well as an FAQ channel on our Discord, where the community can chime in with helpful advice. We also have a Telegram which you can ask questions on:

* [Join the Official Bazaar Community Discord](https://discord.gg/mbpZZbppTP)
    * Even though Bazaar is a chat service, sometimes it takes several hours for community members to respond &mdash; please be patient!
    * Use the `#faq` channel for general questions or discussion about Bazaar
    * Use the `#de-fi` channel for discussion about bDAO and related De-Fi
    * Use the `#request-features` channel for questions or discussion about features for the site
    * Use the `#design-suggestions` channel for questions and discussion about Bazaar's UI and themes
    * Use the `#bug-reports` channel for reporting found bugs (***AFTER you have submitted an issue through GitHub***)
    * There are many other channels available, check the channel list
 
 * [Join the Bazaar Telegram](https://t.me/joinchat/L_izbzRXxLNhNTY5)

## What should I know before I get started?

### Bazaar and packages
Bazaar is coded in React, using TypeScript. It's based off of OpenMinter, which uses Beacon Wallet and Taquito. It uses TzProfiles for identification and TzKT for indexing. The site is deployed via Netlify, and it's IPFS Node and Pinata Node are run using Vultr servers. 

## How Can I Contribute?

### Reporting Bugs

> Once you have submitted an issue via GitHub, please share this in our Discord channel [`#bug-reports`](https://discord.gg/mbpZZbppTP) as well!

This section guides you through submitting a bug report for Bazaar. Following these guidelines helps maintainers and the community understand your report :pencil:, reproduce the behavior :computer: :computer:, and find related reports :mag_right:.

Before creating bug reports, please check [this list](#before-submitting-a-bug-report) as you might find out that you don't need to create one. When you are creating a bug report, please [include as many details as possible](#how-do-i-submit-a-good-bug-report). Fill out [the required template](https://github.com/BazaarMarket/bazaar-market/blob/main/docs/BUG_REPORT.md), the information it asks for helps us resolve issues faster.

> **Note:** If you find a **Closed** issue that seems like it is the same thing that you're experiencing, open a new issue and include a link to the original issue in the body of your new one.

#### Before Submitting A Bug Report

* **Check the [FAQs on our site](https://bazaarnft.xyz)** for a list of common questions and problems.
* **Determine [which repository the problem should be reported in](#bazaar-and-packages)**.
* **Perform a [cursory search](https://github.com/search?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3ABazaarMarket)** to see if the problem has already been reported. If it has **and the issue is still open**, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Bug Report?

Bugs are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined [which repository](#bazaar-and-packages) your bug is related to, create an issue on that repository and provide the following information by filling in [the template](https://github.com/BazaarMarket/bazaar-market/blob/main/docs/BUG_REPORT.md).

Explain the problem and include additional details to help maintainers reproduce the problem:

* **Use a clear and descriptive title** for the issue to identify the problem.
* **Describe the exact steps which reproduce the problem** in as many details as possible. When listing steps, **don't just say what you did, but explain how you did it**.
* **Provide specific examples to demonstrate the steps**. Include links to files or GitHub projects, or copy/pasteable snippets, which you use in those examples. If you're providing snippets in the issue, use [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the behavior you observed after following the steps** and point out what exactly is the problem with that behavior.
* **Explain which behavior you expected to see instead and why.**
* **Include screenshots and animated GIFs** which show you following the described steps and clearly demonstrate the problem. If you use the keyboard while following the steps, **record the GIF with the [Keybinding Resolver](https://github.com/atom/keybinding-resolver) shown**. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **If the problem is related to performance or memory**, include a [CPU profile capture](https://flight-manual.atom.io/hacking-atom/sections/debugging/#diagnose-runtime-performance) with your report.
* **If the problem wasn't triggered by a specific action**, describe what you were doing before the problem happened and share more information using the guidelines below.

Provide more context by answering these questions:

* **Can you reproduce the problem in another browser?**
* **Did the problem start happening recently** (e.g. after updating to a new version of OpenMinter/Taquito/Beacon) or was this always a problem?
* If the problem started happening recently, **can you reproduce the problem in an older version of Bazaar?** What's the most recent version in which the problem doesn't happen? You can download older versions of Bazaar from [the releases page](https://github.com/BazaarMarket/bazaar-market/releases).
* **Can you reliably reproduce the issue?** If not, provide details about how often the problem happens and under which conditions it normally happens.
* If the problem is related to working with files (e.g. opening and editing files), **does the problem happen for all files and projects or only some?** Does the problem happen only when working with local or remote files (e.g. on network drives), with files of a specific type (e.g. only JavaScript or TypeScript files), with large files or files with very long lines, or with files in a specific encoding? Is there anything else special about the files you are using?

Include details about your configuration and environment:

* **What's the name and version of the OS you're using?**
* **What browser are you running Bazaar on?**
* **Which [package versions](#bazaar-and-packages) do you have installed?** You can get that list by checking `package.json`.
* **What local configuration files  are you using** `config.cson`, `mainnet.json`, `testnet.json`, `custom.json` **to launch Bazaar?**
* **What is the size/resolution of your monitor?** Can you reproduce the problem when you use a different-sized monitor?

### Suggesting Enhancements

> Once you have submitted an issue via GitHub, please share this in our Discord channel [`#design-suggestions`](https://discord.gg/mbpZZbppTP) as well!

This section guides you through submitting an enhancement suggestion for Bazaar, including completely new features and minor improvements to existing functionality. Following these guidelines helps maintainers and the community understand your suggestion :pencil: and find related suggestions :mag_right:.

Before creating enhancement suggestions, please check [this list](#before-submitting-an-enhancement-suggestion) as you might find out that you don't need to create one. When you are creating an enhancement suggestion, please [include as many details as possible](#how-do-i-submit-a-good-enhancement-suggestion). Fill in [the template](https://github.com/atom/.github/blob/master/.github/ISSUE_TEMPLATE/feature_request.md), including the steps that you imagine you would take if the feature you're requesting existed.

#### Before Submitting An Enhancement Suggestion

* **Check if the feature already exists**
* **Determine [which repository the enhancement should be suggested in](#bazaar-and-packages).**
* **Perform a [cursory search](https://github.com/search?q=is%3Aopen+is%3Aissue+archived%3Afalse+user%3ABazaarMarket)** to see if the enhancement has already been suggested. If it has, add a comment to the existing issue instead of opening a new one.

#### How Do I Submit A (Good) Enhancement Suggestion?

Enhancement suggestions are tracked as [GitHub issues](https://guides.github.com/features/issues/). After you've determined [which repository](#atom-and-packages) your enhancement suggestion is related to, create an issue on that repository and provide the following information:

* **Use a clear and descriptive title** for the issue to identify the suggestion.
* **Provide a step-by-step description of the suggested enhancement** in as many details as possible.
* **Provide specific examples to demonstrate the steps**. Include copy/pasteable snippets which you use in those examples, as [Markdown code blocks](https://help.github.com/articles/markdown-basics/#multiple-lines).
* **Describe the current behavior** and **explain which behavior you expected to see instead** and why.
* **Include screenshots and animated GIFs** which help you demonstrate the steps or point out the part of Bazaar which the suggestion is related to. You can use [this tool](https://www.cockos.com/licecap/) to record GIFs on macOS and Windows, and [this tool](https://github.com/colinkeenan/silentcast) or [this tool](https://github.com/GNOME/byzanz) on Linux.
* **Explain why this enhancement would be useful to most Bazaar users.**
* **List some other text editors or applications where this enhancement exists.**
* **Specify which browser you're using.**
* **Specify the name and version of the OS you're using.**

### Your First Code Contribution

Unsure where to begin contributing to Bazaar? You can start by looking through these `beginner` and `help-wanted` issues:

* [Beginner issues][beginner] - issues which should only require a few lines of code, and a test or two.
* [Help wanted issues][help-wanted] - issues which should be a bit more involved than `beginner` issues.

Both issue lists are sorted by total number of comments. While not perfect, number of comments is a reasonable proxy for impact a given change will have.

#### Local development

Bazaar Market and all related repositories can be developed locally. For instructions on how to do this, see each repo's README .md. This is a good place to learn how the inner-workings of Bazaar function, and will let you mess around with the platform's code.

### Pull Requests

The process described here has several goals:

- Maintain Bazaar's quality
- Fix problems that are important to users
- Engage the community in working toward creating the best possible NFT marketplace on Tezos. 
- Enable a sustainable system for Bazaar's maintainers to review contributions

Please follow these steps to have your contribution considered by the maintainers:

1. Fork the repo and create your branch from `main`.
2. If you've added code that should be tested, add tests.
3. If you've changed anything major, update the documentation.
4. Ensure the test suite passes and your code lints.
5. Open the PR, specifically targeting our `develop` branch.
6. Follow all instructions in [the PR template](PULL_REQUEST_TEMPLATE.md)
7. Follow the [styleguides](#styleguides)
8. After you submit your pull request, verify that all [status checks](https://help.github.com/articles/about-status-checks/) are passing <details><summary>What if the status checks are failing?</summary>If a status check is failing, and you believe that the failure is unrelated to your change, please leave a comment on the pull request explaining why you believe the failure is unrelated. A maintainer will re-run the status check for you. If we conclude that the failure was a false positive, then we will open an issue to track that problem with our status check suite.</details>

While the prerequisites above must be satisfied prior to having your pull request reviewed, the reviewer(s) may ask you to complete additional design work, tests, or other changes before your pull request can be ultimately accepted.

## Styleguides

### Git Commit Messages

* Use the present tense ("Add feature" not "Added feature")
* Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
* Limit the first line to 72 characters or less
* Reference issues and pull requests liberally after the first line
* When only changing documentation, include `[ci skip]` in the commit title
* Consider starting the commit message with an applicable emoji:
    * :art: `:art:` when improving the format/structure of the code
    * :racehorse: `:racehorse:` when improving performance
    * :memo: `:memo:` when writing docs
    * :penguin: `:penguin:` when fixing something on Linux
    * :apple: `:apple:` when fixing something on macOS
    * :checkered_flag: `:checkered_flag:` when fixing something on Windows
    * :bug: `:bug:` when fixing a bug
    * :fire: `:fire:` when removing code or files
    * :green_heart: `:green_heart:` when fixing the CI build
    * :white_check_mark: `:white_check_mark:` when adding tests
    * :lock: `:lock:` when dealing with security
    * :arrow_up: `:arrow_up:` when upgrading dependencies
    * :arrow_down: `:arrow_down:` when downgrading dependencies
    * :shirt: `:shirt:` when removing linter warnings


### Documentation Styleguide

* Use [Markdown](https://daringfireball.net/projects/markdown).
	* Use StackEdit.io for online markdown editing.

## References
This document was adapted from the contribution guidelines from [Transcriptase](https://gist.github.com/briandk/3d2e8b3ec8daf5a27a62) as well as [Atom's CONTRIBUTING Template](https://github.com/atom/atom/blob/master/CONTRIBUTING.md)
