Learning is a large motivator for this project. My initial goal was to learn Angular 2, but that's wrapped in a bunch of other knowledge
dependencies that I've been exploring as well. The goal of this document is to keep track of what those topics were, primarily for Future Luke.

More to come on these topics, but the main concepts / technologies I'm wrapping my head around for this project at this point include:

### Angular 2
Spiritually related to Angular 1 but otherwise pretty hard to recognize. I'm actually really loving it. Timing has historically been pretty tough
with Angular 2 since they've been rapidly iterating on their API's; I've honestly avoided it during the thrashing but started this project a day
or two after RC1 was released.

One of my biggest challenges so far has been understanding how all of the pieces of Angular fit together. Unfortunately their intro example pulls
in a hot mess of dependencies, including in-browser transpiling stuff that I didn't want to start with (there's a point where introducing too many 
new things at once is a bad idea). It took me many hours but I eventually figured out how to reproduce the in-browser build process with a Gulp-based
workflow that I was much more familiar with and honestly performs better for the way I work.

### Typescript
As someone who appreciates strongly typed languages, I love Typescript. I wish I wouldn't have waited so long to learn it.

### Reactive programming (rxjs)
Slowly learning to love. [Praise be to @staltz](https://gist.github.com/staltz/868e7e9bc2a7b8c1f754).