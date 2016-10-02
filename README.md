# [Demo](https://rigellute.github.io/musical-typing/)
## Musical Typing
Parse text messages into music notation.

This is a small experiment to create a react wrapper for [Vexflow](https://github.com/0xfe/vexflow/wiki), a musical engraving library.
### Goals and uses
One potential goal of the project is to explore the possibility of using music notation for steganography. One could 'encrypt' text messages and conceal the encryption in music notation.

Another goal is to explore the bounds of music - with a tool like this you could arbitrarily produce sheets of music notation, which when played can produce sounds that would normally constitute music. However, because the intention is to conceal and transmit a message, with no regard to 'musicality', is it really music?

Yet another goal is to use the tool as an aid for composition. One immediate use is in creating a musical cryptogram using ones name, which can then form a core motif of the composition (here is a [superb example](https://en.wikipedia.org/wiki/BACH_motif)).

### Todos
* Enable dynamic note duration calculations.
* Address the one bar per stave inefficiency.
* Create instrument components (currently there is only a stave component)
* Devise a smarter way of mapping english characters to musical notes (current mapping is extremely naive).
* Add midi playback of the music.
