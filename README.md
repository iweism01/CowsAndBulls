## Game Description

Cows and Bulls is a number guessing game that puts players' deduction and number-crunching abilities to the test. The game comprises two distinct roles: the Game Manager and the Player. Click here to play: [CowsAndBullsGame](https://main.d1hwr2ihaefbou.amplifyapp.com/)

## *The Game Manager*

The Game Manager kicks off a game by selecting a secret number that fits in a predetermined parameter range. This number remains concealed from the Player throughout the entire game. The Game Manager's role is to provide hints and feedback, guiding the Player toward successfully guessing the secret number.

To aid the Player in guessing the number, the Game Manager offers two types of feedback:

-   Cows (hits): For each correct digit guessed by the Player but placed in the wrong position, the Game Manager awards one "Cow." Cows indicate that the Player has identified a valid digit within the secret number but has not placed it correctly.
    
-   Bulls (perfect hits): When the Player correctly guesses a digit and places it in the right position, the Game Manager grants one "Bull." Bulls signify that the Player has not only identified the correct digit but also its proper placement within the secret number.
    

The Game Manager continues providing these clues after each guess the Player makes, helping the Player refine their attempts to guess the secret number.

## *The Player*

Equipped with the knowledge that the secret number consists of a specific number of digits within a specific range, the Player starts by making the initial guess. After each guess, the Game Manager offers feedback in the form of Cows and Bulls to aid the Player's pursuit.

The Player's objective is to leverage this feedback to deduce the secret number in as little guesses as possible.. As the Player refines their guesses, they must employ logical reasoning and process of elimination to reveal the secret number's identity. The game proceeds with the Player making successive guesses and receiving feedback from the Game Manager until the Player has guessed the secret number correctly.

—--------------------------------------------------------------------------------

The game I have coded has 3 “game modes”:

**Game Manager: Computer
Player: You**

As the player, your job is to guess the number the computer selects. You are allowed to choose the parameters the computer must follow when picking the number: length of the number, as well as range of digits. The longer the number, and larger the digit range, the harder it will be to guess the number. After each guess, the computer will provide you with the amount of hits (Cows), and perfect hits (Bulls), your previous guess had. Using this information, you will be able to deduce what the number is in however many guesses it takes you.

**Game Manager: You
Player: Computer**

As the game manager, it is your job to pick a number that the computer must guess. Once again, you may choose whatever parameters you want, making it easier, or harder, for the computer to guess your number. After each one of the computer’s guesses, you provide the number of hits and perfect hits to the computer, and using this information, the computer will attempt to guess your number. <it reminds me, you should add a response by the computer, that no valid numbers exists, in case the game manger made a mistake in providing hits/perfect hits >

**Game Manager: Computer
Player: Computer (kinda…)**

In this game mode, you do not need to guess a number, or report the number of hits and perfect hits after each guess. Instead, the computer will be playing itself, but you do have a few options for how you want the computer versus computer matchup to be played:

`Smart Player:` This option ensures that the computer will make the smartest decisions in terms of which numbers to guess. This player selects the number from its remaining set of possible answers that has the most unique digits, efficiently reducing the possibilities with each guess.

`Average Player:` This option has the computer play less smartly, but still in an effective manner. This player selects the first number from the remaining number set, making sequential guesses without much strategy.

`Random Player:` The random player relies on pure chance to make its guesses. It randomly selects a number from the remaining number set (never repeating guesses).

  

This game mode will simulate 1000 rounds of whichever player you select, and will provide feedback on how they did. It can also give you an indication of how well you are playing.

These results can give you some context to how well you are playing.

  

## Code Description

 I developed this "Cows and Bulls" number-guessing game as a personal coding exercise to reinforce my understanding of JavaScript while learning the language. The project allowed me to practice various JavaScript concepts, such as event handling, DOM manipulation, and implementing game logic. I aimed to create an interactive and engaging game that users can enjoy while also challenging myself to build a functional application from scratch.

During the development process, I focused on writing clean and well-organized code to ensure readability and maintainability. I divided the functionality into separate functions, each responsible for specific tasks, which helped me to understand the flow of the game better. As I continue to learn and grow as a developer, I recognize that there is room for improvement, particularly in enhancing the visual aspects of the game. I plan to take a CSS class in the future to elevate the user experience by designing a visually appealing and user-friendly interface. Overall, this coding exercise has been a valuable learning experience, and I look forward to further refining and expanding my JavaScript skills in future projects.

  

This is a table showing the different performance characteristics of the different players/strategies ….

  
|  | Smart Player | Average Player | Random Player |
|--|--|--|--|
| Average # of Guesses |4.686|5.773|646.758
| Smallest # of Guesses|2|1|5
| Largest # of Guesses |7|9|1296


## To-Do
- Add special value for infinite number of actions

