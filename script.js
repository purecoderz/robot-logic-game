<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Checkpoint 02 - Piscine Exam</title>
    <style>
        :root {
            --bg-body: #0d1117;
            --bg-card: #161b22;
            --bg-header: #161b22;
            --border-color: #30363d;
            --text-main: #c9d1d9;
            --text-muted: #8b949e;
            --accent-green: #238636;
            --accent-blue: #58a6ff;
            --tag-bg: #21262d;
            --tag-border: #363b42;
            --progress-bg: #21262d;
            --progress-fill: #238636;
            --code-bg: #0d1117;
        }

        body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
            background-color: var(--bg-body);
            color: var(--text-main);
            margin: 0;
            padding: 0;
            line-height: 1.5;
        }

        /* Header Style */
        .top-bar {
            background-color: var(--bg-header);
            border-bottom: 1px solid var(--border-color);
            padding: 16px 32px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            position: sticky;
            top: 0;
            z-index: 100;
        }

        .red {
            color: green
        }

        .logo {
            font-weight: 700;
            font-size: 1.2rem;
            color: var(--text-main);
            display: flex;
            align-items: center;
            gap: 10px;
            cursor: pointer;
        }

        .logo span {
            background: var(--text-main);
            color: var(--bg-body);
            padding: 2px 6px;
            border-radius: 4px;
        }

        .user-profile {
            display: flex;
            align-items: center;
            gap: 10px;
            font-size: 0.9rem;
        }

        .avatar {
            width: 32px;
            height: 32px;
            background-color: var(--border-color);
            border-radius: 50%;
        }

        /* Main Container */
        .container {
            max-width: 900px;
            margin: 40px auto;
            padding: 0 20px;
        }

        /* Views */
        .view-section {
            display: block;
            animation: fadeIn 0.3s ease-in-out;
        }

        .hidden {
            display: none !important;
        }

        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateY(10px);
            }

            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .exam-header {
            margin-bottom: 30px;
        }

        .exam-header h1 {
            font-size: 2rem;
            margin: 0 0 10px 0;
        }

        .exam-meta {
            color: var(--text-muted);
            font-size: 0.95rem;
            display: flex;
            gap: 20px;
        }

        /* Level Cards */
        .level-card {
            background-color: var(--bg-card);
            border: 1px solid var(--border-color);
            border-radius: 6px;
            margin-bottom: 24px;
            overflow: hidden;
            box-shadow: 0 3px 6px rgba(0, 0, 0, 0.2);
            transition: transform 0.2s, border-color 0.2s;
            cursor: pointer;
        }

        .level-card:hover {
            border-color: var(--accent-blue);
            transform: translateY(-2px);
        }

        .level-header {
            padding: 16px 24px;
            border-bottom: 1px solid var(--border-color);
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.02);
        }

        .tester {
            background-color: rgba(255, 255, 255, 0.02);
        }

        .level-title {
            font-size: 1.1rem;
            font-weight: 600;
            color: var(--accent-blue);
        }

        .grade-badge {
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            background-color: rgba(56, 139, 253, 0.15);
            color: #58a6ff;
            padding: 4px 10px;
            border-radius: 2em;
            font-size: 0.85rem;
            font-weight: 600;
            border: 1px solid rgba(56, 139, 253, 0.4);
        }

        .level-body {
            padding: 24px;
        }

        .description {
            margin-bottom: 16px;
            font-size: 0.9rem;
            color: var(--text-muted);
        }

        /* Exercise Tags */
        .exercise-pool {
            display: flex;
            flex-wrap: wrap;
            gap: 10px;
        }

        .exercise-tag {
            background-color: var(--tag-bg);
            border: 1px solid var(--tag-border);
            border-radius: 6px;
            padding: 6px 12px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 0.85rem;
            color: var(--text-main);
            transition: all 0.2s ease;
        }

        .exercise-tag.go-file {
            color: #79c0ff;
        }

        /* Detail View Styles */
        .back-btn {
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-muted);
            padding: 8px 16px;
            border-radius: 6px;
            cursor: pointer;
            margin-bottom: 20px;
            display: inline-flex;
            align-items: center;
            gap: 5px;
            font-size: 0.9rem;
        }

        .back-btn:hover {
            color: var(--text-main);
            border-color: var(--text-main);
        }

        .detail-header {
            border-bottom: 1px solid var(--border-color);
            padding-bottom: 20px;
            margin-bottom: 20px;
        }

        .accordion-item {
            border: 1px solid var(--border-color);
            background-color: var(--bg-card);
            border-radius: 6px;
            margin-bottom: 10px;
            overflow: hidden;
        }

        .accordion-header {
            padding: 15px 20px;
            cursor: pointer;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: rgba(255, 255, 255, 0.02);
            font-weight: 600;
        }

        .accordion-header:hover {
            background-color: rgba(255, 255, 255, 0.05);
        }

        .accordion-content {
            padding: 0;
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.3s ease-out;
            background-color: #0d1117;
        }

        .accordion-content.active {
            padding: 20px;
            max-height: 2000px;
            border-top: 1px solid var(--border-color);
        }

        .subject-text {
            font-size: 0.95rem;
            color: #c9d1d9;
        }

        .subject-text h3 {
            color: var(--text-main);
            margin-top: 1em;
            margin-bottom: 0.5em;
            font-size: 1rem;
            border-bottom: 1px solid #30363d;
            padding-bottom: 0.3em;
        }

        .subject-text h3:first-child {
            margin-top: 0;
        }

        .subject-text code {
            background-color: rgba(110, 118, 129, 0.4);
            padding: 0.2em 0.4em;
            border-radius: 6px;
            font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
            font-size: 85%;
        }

        .subject-text pre {
            background-color: #0d1117;
            padding: 16px;
            overflow: auto;
            font-size: 85%;
            line-height: 1.45;
            border-radius: 6px;
            border: 1px solid var(--border-color);
        }

        /* Helper for description formatting */
        .description-content ul, .description-content ol {
            padding-left: 20px;
        }
        .description-content li {
            margin-bottom: 5px;
        }

        /* Roman table style */
        .roman-table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
            font-size: 0.9em;
        }
        .roman-table th, .roman-table td {
            border: 1px solid var(--border-color);
            padding: 8px;
            text-align: center;
        }
        .roman-table th {
            background-color: rgba(255, 255, 255, 0.05);
        }
    </style>
</head>

<body>

    <div class="top-bar">
        <div class="logo" onclick="showDashboard()"><span>01</span> INTRA</div>
        <div class="user-profile">
            <span>Student</span>
            <div class="avatar"></div>
        </div>
    </div>

    <div class="container">

        <div id="dashboard-view" class="view-section">
            <div class="exam-header">
                <h1>Checkpoint 02</h1>
                <div class="exam-meta">
                    <span>Duration: 04:00:00</span>
                    <span>Status: <span style="color: #d29922;">In Progress</span></span>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(1)">
                <div class="level-header">
                    <span class="level-title">Question 1</span>
                    <span class="grade-badge">Unlock Level</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">only1</span>
                        <span class="exercise-tag">onlya</span>
                        <span class="exercise-tag">onlyb</span>
                        <span class="exercise-tag">onlyf</span>
                        <span class="exercise-tag">onlyz</span>
                        <span class="exercise-tag go-file">hello.go</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(2)">
                <div class="level-header">
                    <span class="level-title">Question 2</span>
                    <span class="grade-badge">Achieves 10%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">checknumber</span>
                        <span class="exercise-tag">countalpha</span>
                        <span class="exercise-tag">countcharacter</span>
                        <span class="exercise-tag">printif</span>
                        <span class="exercise-tag">printifnot</span>
                        <span class="exercise-tag">rectperimeter</span>
                        <span class="exercise-tag">retainfirsthalf</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(3)">
                <div class="level-header">
                    <span class="level-title">Question 3</span>
                    <span class="grade-badge">Achieves 20%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">cameltosnakecase</span>
                        <span class="exercise-tag">digitlen</span>
                        <span class="exercise-tag">firstword</span>
                        <span class="exercise-tag">fishandchips</span>
                        <span class="exercise-tag">gcd</span>
                        <span class="exercise-tag">hashcode</span>
                        <span class="exercise-tag">lastword</span>
                        <span class="exercise-tag">repeatalpha</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(4)">
                <div class="level-header">
                    <span class="level-title">Question 4</span>
                    <span class="grade-badge">Achieves 35%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">findprevprime</span>
                        <span class="exercise-tag">fromto</span>
                        <span class="exercise-tag">iscapitalized</span>
                        <span class="exercise-tag">itoa</span>
                        <span class="exercise-tag">printmemory</span>
                        <span class="exercise-tag">printrevcomb</span>
                        <span class="exercise-tag">thirdtimeisacharm</span>
                        <span class="exercise-tag">weareunique</span>
                        <span class="exercise-tag">zipstring</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(5)">
                <div class="level-header">
                    <span class="level-title">Question 5</span>
                    <span class="grade-badge">Achieves 50%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">addprimesum</span>
                        <span class="exercise-tag">canjump</span>
                        <span class="exercise-tag">chunk</span>
                        <span class="exercise-tag">concatalternate</span>
                        <span class="exercise-tag">concatslice</span>
                        <span class="exercise-tag">fprime</span>
                        <span class="exercise-tag">hiddenp</span>
                        <span class="exercise-tag">inter</span>
                        <span class="exercise-tag">reversestrcap</span>
                        <span class="exercise-tag">saveandmiss</span>
                        <span class="exercise-tag">union</span>
                        <span class="exercise-tag">wdmatch</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(6)">
                <div class="level-header">
                    <span class="level-title">Question 6</span>
                    <span class="grade-badge">Achieves 65%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">fifthandskip</span>
                        <span class="exercise-tag">notdecimal</span>
                        <span class="exercise-tag">revconcatalternate</span>
                        <span class="exercise-tag">slice</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(7)">
                <div class="level-header">
                    <span class="level-title">Question 7</span>
                    <span class="grade-badge">Achieves 75%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">findpairs</span>
                        <span class="exercise-tag">revwstr</span>
                        <span class="exercise-tag">rostring</span>
                        <span class="exercise-tag">wordflip</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(8)">
                <div class="level-header">
                    <span class="level-title">Question 8</span>
                    <span class="grade-badge">Achieves 85%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">itoabase</span>
                        <span class="exercise-tag">options</span>
                        <span class="exercise-tag">piglatin</span>
                        <span class="exercise-tag">romannumbers</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(9)">
                <div class="level-header">
                    <span class="level-title">Question 9</span>
                    <span class="grade-badge">Achieves 95%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">brackets</span>
                        <span class="exercise-tag">rpncalc</span>
                    </div>
                </div>
            </div>

            <div class="level-card" onclick="openLevel(10)">
                <div class="level-header">
                    <span class="level-title">Question 10</span>
                    <span class="grade-badge">Achieves 100%</span>
                </div>
                <div class="level-body">
                    <div class="description">Click to view potential questions for this level</div>
                    <div class="exercise-pool">
                        <span class="exercise-tag">brainfuck</span>
                        <span class="exercise-tag">grouping</span>
                    </div>
                </div>
            </div>
        </div>

        <div id="detail-view" class="view-section hidden">
            <button class="back-btn" onclick="showDashboard()">
                <span>←</span> Back to Dashboard
            </button>
            <div class="detail-header">
                <h1 id="detail-title">Question X</h1>
                <p style="color: var(--text-muted);">Click on a question below to reveal the subject.</p>
            </div>
            <div id="questions-container">
            </div>
        </div>

    </div>

    <script>
        // Data for all questions with prototypes updated based on your provided solutions
        const questionsData = {
            1: [
                {
                    id: "only1",
                    desc: "Write a program that displays a '1' character on the standard output.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                },
                {
                    id: "onlya",
                    desc: "Write a program that displays a 'a' character on the standard output.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                },
                {
                    id: "onlyb",
                    desc: "Write a program that displays a 'b' character on the standard output.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                },
                {
                    id: "onlyf",
                    desc: "Write a program that displays a 'f' character on the standard output.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                },
                {
                    id: "onlyz",
                    desc: "Write a program that displays a 'z' character on the standard output.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                },
                {
                    id: "hello.go",
                    desc: "Write a program that displays 'Hello World!' followed by a newline.",
                    proto: "package main\n\nfunc main() {\n    // ...\n}"
                }
            ],
            2: [
                {
                    id: "checknumber",
                    desc: "Write a function that takes a string as an argument and returns true if the string contains any number, otherwise return false.",
                    proto: "func CheckNumber(arg string) bool {",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.CheckNumber("123"))
    fmt.Println(piscine.CheckNumber("H3llo"))
    fmt.Println(piscine.CheckNumber("Hello"))
}`,
                    usageOutput: `true$
true$
false$`
                },
                {
                    id: "countalpha",
                    desc: "Write a function CountAlpha() that takes a string as an argument and returns the number of alphabetic characters in the string.",
                    proto: "func CountAlpha(s string) int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.CountAlpha("Hello 123"))
    fmt.Println(piscine.CountAlpha("H e l l o"))
    fmt.Println(piscine.CountAlpha("12345"))
}`,
                    usageOutput: `5$
5$
0$`
                },
                {
                    id: "countcharacter",
                    desc: `write a function that takes a string and a character as arguments and returns the number of times the character appears in the string.
                            if the character is not in the string return 0
                            if the string is empty return 0`,
                    proto: "func CountChar(str string, c rune) int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.CountChar("Hello World", 'l'))
    fmt.Println(piscine.CountChar("5", '5'))
    fmt.Println(piscine.CountChar("ola!", '4'))
}`,
                    usageOutput: `3$
1$
0$`
                },
                {
                    id: "printif",
                    desc: `Write a function that takes a string as an argument and returns the letter G followed by a newline \n if the argument length is more or equal than 3,
                             otherwise returns Invalid Input followed by a newline \\n.
                            If it's an empty string return G followed by a newline \\n.`,
                    proto: "func PrintIf(str string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.PrintIf("abcdef"))
    fmt.Print(piscine.PrintIf("abc"))
    fmt.Print(piscine.PrintIf(""))
    fmt.Print(piscine.PrintIf("14"))
}`,
                    usageOutput: `G$
G$
G$
Invalid Input$`
                },
                {
                    id: "printifnot",
                    desc: `Write a function that takes a string and returns:
                            "G\n" if the string's length is less than 3 (including empty string).
                            "Invalid Input\n" otherwise.`,
                    proto: "func PrintIfNot(str string)",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.PrintIfNot("ab"))
    fmt.Print(piscine.PrintIfNot("abc"))
    fmt.Print(piscine.PrintIfNot(""))
    fmt.Print(piscine.PrintIfNot("145"))
}`,
                    usageOutput: `G$
Invalid Input$
G$
Invalid Input$`
                },
                {
                    id: "rectperimeter",
                    desc: `Write a function that takes two int's as arguments, representing the length of width and height of a rectangle and returning the perimeter of the rectangle.
                            If one of the arguments is negative it should return -1`,
                    proto: "func RectPerimeter(w, h int) int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.RectPerimeter(10, 2))
    fmt.Println(piscine.RectPerimeter(434343, 13))
    fmt.Println(piscine.RectPerimeter(10, -2))
}`,
                    usageOutput: `24$
868712$
-1$`
                },
                {
                    id: "retainfirsthalf",
                    desc: `Write a function called RetainFirstHalf() that takes a string as an argument and returns the first half of this string.
                                If the length of the string is odd, round it down.
                                If the string is empty, return an empty string.
                                If the string length is equal to one, return the string.`,
                    proto: "func RetainFirstHalf(str string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.RetainFirstHalf("This is the 1st halfThis is the 2nd half"))
    fmt.Println(piscine.RetainFirstHalf("A"))
    fmt.Println(piscine.RetainFirstHalf(""))
    fmt.Println(piscine.RetainFirstHalf("Hello World"))
}`,
                    usageOutput: `This is the 1st half$
A$
$
Hello$`
                }
            ],
            3: [
                {
                    id: "cameltosnakecase",
                    desc: `Write a function that converts a string from camelCase to snake_case.
                        <ol>
                        <li> If the string is empty, return an empty string. </li>
                        <li> If the string is not camelCase, return the string unchanged. </li>
                        <li> If the string is camelCase, return the snake_case version of the string. </li>
                        </ol>

                        For this exercise you need to know that camelCase has two different writing alternatives that will be accepted:
                        lowerCamelCase
                        UpperCamelCase
                        <br>Rules for writing in camelCase:</br>
                        <ul>
                        <li> The word does not end on a capitalized letter (CamelCasE). </li>
                        <li> No two capitalized letters shall follow directly each other (CamelCAse). </li>
                        <li> Numbers or punctuation are not allowed in the word anywhere (camelCase1). </li>
                        </ul>
                    `,
                    proto: "func CamelToSnakeCase(s string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.CamelToSnakeCase("CamelCase"))
    fmt.Println(piscine.CamelToSnakeCase("camelCase"))
    fmt.Println(piscine.CamelToSnakeCase("CamelCase1"))
    fmt.Println(piscine.CamelToSnakeCase("CamelCAse"))
}`,
                    usageOutput: `camel_case$
camel_case$
CamelCase1$
CamelCAse$`
                },
                {
                    id: "digitlen",
                    desc: `Write a function DigitLen() that takes two integers as arguments and returns the times the first int can be divided by the second until it reaches zero.
                    <ol>
                        <li> The second int must be between 2 and 36. If not, the function returns -1. </li>
                        <li> If the first int is negative, reverse the sign and count the digits. </li> </ol>`, 
                    proto: "func DigitLen(n, base int) int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.DigitLen(100, 10))
    fmt.Println(piscine.DigitLen(100, 2))
    fmt.Println(piscine.DigitLen(-100, 16))
    fmt.Println(piscine.DigitLen(100, -1))
}`,
                    usageOutput: `3$
7$
2$
-1$`
                },
                {
                    id: "firstword",
                    desc: `Write a function that takes a string and return a string containing its first word, followed by a newline ('\n').
                            <ul><li>A word is a sequence of characters delimited by spaces or by the start/end of the argument.</li></ul>`,
                    proto: "func FirstWord(s string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.FirstWord("Hello World"))
    fmt.Print(piscine.FirstWord("I am a student"))
    fmt.Print(piscine.FirstWord("a"))
    fmt.Print(piscine.FirstWord("   lorem ipsum"))
}`,
                    usageOutput: `Hello$
I$
a$
lorem$`
                },
                {
                    id: "fishandchips",
                    desc: `Write a function called FishAndChips() that takes an int and returns a string.
                            <ul>
                            <li>If the number is divisible by 2, print fish. </li>
                            <li>If the number is divisible by 3, print chips. </li>
                            <li>If the number is divisible by 2 and 3, print fish and chips. </li>
                            <li>If the number is negative return error: number is negative. </li>
                            <li>If the number is non divisible by 2 or 3 return error: non divisible. </li> </ul>`,
                    proto: "func FishAndChips(n int) string {",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.FishAndChips(4))
    fmt.Println(piscine.FishAndChips(9))
    fmt.Println(piscine.FishAndChips(6))
    fmt.Println(piscine.FishAndChips(-2))
    fmt.Println(piscine.FishAndChips(5))
}`,
                    usageOutput: `fish$
chips$
fish and chips$
error: number is negative$
error: non divisible$`
                },
                {
                    id: "gcd",
                    desc: "Write a function that takes two uint representing two strictly positive integers and returns their greatest common divisor. If any of the input numbers is 0, the function should return 0.",
                    proto: "func Gcd(a, b uint) uint",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.Gcd(42, 10))
    fmt.Println(piscine.Gcd(42, 12))
    fmt.Println(piscine.Gcd(14, 77))
    fmt.Println(piscine.Gcd(17, 3))
}`,
                    usageOutput: `2$
6$
7$
1$`
                },
                {
                    id: "hashcode",
                    desc: `Write a function called HashCode() that takes a string as an argument and returns a new hashed string.
                        <ul>
                            <li>The hash equation is computed as follows: <li> <br>

                        (ASCII of current character + size of the string) % 127, ensuring the result falls within the ASCII range of 0 to 127.

                            <li>If the resulting character is unprintable add 33 to it. </li></ul>`,
                    proto: "func HashCode(dec string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.HashCode("A"))
    fmt.Println(piscine.HashCode("AB"))
    fmt.Println(piscine.HashCode("Hello"))
    fmt.Println(piscine.HashCode("123"))
}`,
                    usageOutput: `B$
CD$
Mjqqt$
456$`
                },
                {
                    id: "lastword",
                    desc: `Write a function LastWord that takes a string and returns its last word followed by a \\n. <br>
                            <ul><li>A word is a section of string delimited by spaces or by the start/end of the string.</li></ul>`,
                    proto: "func LastWord(s string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.LastWord("Hello World"))
    fmt.Print(piscine.LastWord("I am a student"))
    fmt.Print(piscine.LastWord("a"))
    fmt.Print(piscine.LastWord("   lorem ipsum   "))
}`,
                    usageOutput: `World$
student$
a$
ipsum$`
                },
                {
                    id: "repeatalpha",
                    desc: `Write a function called RepeatAlpha that takes a string and displays it repeating each alphabetical character as many times as its alphabetical index. <br>
                            'a' becomes 'a', 'b' becomes 'bb', 'e' becomes 'eeeee', etc...`,
                    proto: "func RepeatAlpha(s string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.RepeatAlpha("abc"))
    fmt.Println(piscine.RepeatAlpha("Choumi."))
    fmt.Println(piscine.RepeatAlpha(""))
    fmt.Println(piscine.RepeatAlpha("abacadaba 01!"))
}`,
                    usageOutput: `abbccc$
CCccchhhhhhhhooooooooooooooouuuuuuuuuuuuuuuuuuuuummmmmmmmmmmmmiiiiiiiii.$
$
abbacccaddddabbba 01!$`
                }
            ],
            4: [
                {
                    id: "findprevprime",
                    desc: `Write a function that returns the first prime number that is equal or inferior to the int passed as parameter.
                            <br>If there are no primes inferior to the int passed as parameter the function should return 0.`,
                    proto: `func FindPrevPrime(nb int) int`,
                    usageCode: `package main

import "fmt"

func main() {
    fmt.Println(FindPrevPrime(5))
    fmt.Println(FindPrevPrime(4))
}`,
                    usageOutput: `5$
3$`
                },
                {
                    id: "fromto",
                    desc: `Write a function that takes two integers and returns a string showing the range of numbers from the first to the second.
                    <ul>
                        <li>The numbers must be separated by a comma and a space.</li>
                        <li>If any of the arguments is bigger than 99 or less than 0, the function returns Invalid followed by a newline \\n.</li>
                        <li>Prepend a 0 to any number that is less than 10.</li>
                        <li>Add a new line \\n at the end of the string.</li>
                    </ul>`,
                    proto: "func FromTo(from int, to int) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.FromTo(1, 10))
    fmt.Print(piscine.FromTo(10, 1))
    fmt.Print(piscine.FromTo(10, 10))
    fmt.Print(piscine.FromTo(100, 10))
}`,
                    usageOutput: `01, 02, 03, 04, 05, 06, 07, 08, 09, 10$
10, 09, 08, 07, 06, 05, 04, 03, 02, 01$
10$
Invalid$`
                },
                {
                    id: "iscapitalized",
                    desc: `Write a function IsCapitalized() that takes a string as an argument and returns true if each word in the string begins with either an uppercase letter or a non-alphabetic character.
                        <ul>
                            <li>If any of the words begin with a lowercase letter return false.</li>
                            <li>If the string is empty return false.</li></ul>`,
                    proto: "func IsCapitalized(s string) bool",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Println(IsCapitalized("Hello! How are you?"))
    fmt.Println(IsCapitalized("Hello How Are You"))
    fmt.Println(IsCapitalized("Whats 4this 100K?"))
    fmt.Println(IsCapitalized("Whatsthis4"))
    fmt.Println(IsCapitalized("!!!!Whatsthis4"))
    fmt.Println(IsCapitalized(""))
}`,
                    usageOutput: `true$
false
true
true
true
true
false`
                },
                {
                    id: "itoa",
                    desc: `<ul><li>Write a function that simulates the behavior of the Itoa function in Go. 
                        <br>Itoa transforms a number represented as anint in a number represented as a string.</li>
                            <li>For this exercise the handling of the signs + or - does have to be taken into account.</li></ul>`,
                    proto: "func Itoa(n int) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.Itoa(12345))
    fmt.Println(piscine.Itoa(0))
    fmt.Println(piscine.Itoa(-1234))
    fmt.Println(piscine.Itoa(987654321))
}`,
                    usageOutput: `12345$
0$
-1234$
987654321$`
                },
                {
                    id: "printmemory",
                    desc: `Write a function that takes (arr [10]byte), and displays the memory as in the example.<br>
                        After displaying the memory the function must display all the ASCII graphic characters. The non printable characters must be replaced by a dot.
                        <br>The ASCII graphic characters are any characters intended to be written, printed, or otherwise displayed in a form that can be read by humans, present on the ASCII encoding.`,
                    proto: "func PrintMemory(arr [10]byte)",
                    usageCode: `package main

import "piscine"

func main() {
    piscine.PrintMemory([10]byte{'h', 'e', 'l', 'l', 'o', 16, 21, '*'})
}`,
                    usageOutput: `68 65 6c 6c$<br>6f 10 15 2a$<br>00 00$<br>hello..*..$`
                },
                {
                    id: "printrevcomb",
                    desc: `Write a program that prints in descending order on a single line all unique combinations of three different digits so that the first digit is greater than the second and the second is greater than the third.
                            <br>These combinations are separated by a comma and a space.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `......`,
                    usageOutput: `$ go run . | cat -e
987, 986, 985, 984, 983, 982, 981, 980, 976, ..., 310, 210$
$`
                },
                {
                    id: "thirdtimeisacharm",
                    desc: `Write a function ThirdTimeIsACharm() that takes a string as an argument and returns another string with every third character.
                    <ul>
                    <li>Return the output followed by a newline \n. </li>
                    <li>If the string is empty, return a newline \n. </li>
                    <li>If there is no third character, return a newline \n. </li></ul>`,
                    proto: "func ThirdTimeIsACharm(str string) string",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Print(ThirdTimeIsACharm("123456789"))
    fmt.Print(ThirdTimeIsACharm(""))
    fmt.Print(ThirdTimeIsACharm("a b c d e f"))
    fmt.Print(ThirdTimeIsACharm("12"))
}`,
                    usageOutput: `369$
$
b e$
$`
                },
                {
                    id: "weareunique",
                    desc: `Write a function that takes two strings's and returns the number of characters that are not included in both, without repeating characters.
                    <ul>
                            <li>If there is no unique characters return 0.</li>
                            <li>If both strings are empty return -1.</li></ul>`,
                    proto: "func WeAreUnique(str1, str2 string) int",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Println(WeAreUnique("foo", "boo"))
    fmt.Println(WeAreUnique("", ""))
    fmt.Println(WeAreUnique("abc", "def"))
}`,
                    usageOutput: `2$
-1$
6$`
                },
                {
                    id: "zipstring",
                    desc: `Write a function that takes a string and returns a new string that replaces every character with the number of duplicates and the character itself, deleting the extra duplications.
                            <ul><li>The letters are from the latin alphabet list only. Any other character, symbols, shall not be tested.</li><ul>`,
                    proto: "func ZipString(s string) string",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Println(ZipString("YouuungFellllas"))
    fmt.Println(ZipString("Thee quuick browwn fox juumps over the laaazy dog"))
    fmt.Println(ZipString("Helloo Therre!"))
}`,
                    usageOutput: `1Y1o3u1n1g1F1e4l1a1s$
1T1h2e1 1q2u1i1c1k1 1b1r1o2w1n1 1f1o1x1 1j2u1m1p1s1 1o1v1e1r1 1t1h1e1 1l3a1z1y1 1d1o1g$
1H1e2l2o1 1T1h1e2r1e1!$`
                }
            ],
            5: [
                {
                    id: "addprimesum",
                    desc: `Write a program that takes a positive integer as argument and displays the sum of all prime numbers inferior or equal to it followed by a newline ('\n').
                        <ul><li>If the number of arguments is different from 1, or if the argument is not a positive number, the program displays 0 followed by a newline.</li></ul>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . 5
10
$ go run . 7
17
$ go run . -2
0
$ go run . 0
0
$ go run .
0
$ go run . 5 7
0`,
                    usageOutput: `10$
17$
0$
0$
0$
0$`
                },
                {
                    id: "canjump",
                    desc: `Given an array of non-negative integers representing the number of steps you can take forward from each position, implement the function CanJump() which takes a slice of unsigned integers []uint as input and returns a boolean value. This function should determine if it's possible to reach and stay at the last index of the array starting from the first index, based on the steps you need to advance. Be aware that:
                        <ol>
                        <li>Each value represents the exact number of steps you must take forward from that position.</li>
                        <li>The function should return true if it's possible to reach and stay at the last index without stepping out of the array, and false otherwise.</li>
                        <li>If the input has only one element, that is the last position in the array so the function will return true but if the array is empty it returns false.</li>
                        </ol>
                        Let's take the example array input := []uint{2, 3, 1, 1, 4}.
                        <pre>
Position: 0  1  2  3  4
Steps:    2  3  1  1  4
          ^

// Starting from position 0, you have 2 steps to move forward. This means you will move to positions 2.

Position: 0  1  2  3  4
Steps:    2  3  1  1  4
                ^

// From position 2, you have 1 step, so you will move to position 3.

Position: 0  1  2  3  4
Steps:    2  3  1  1  4
                    ^

// Finally, from position 3, you have 1 step to reach the last index at position 4 confirming that it's possible so the output will be "True".

Position: 0  1  2  3  4
Steps:    2  3  1  1  4
                      ^</pre>`,
                    proto: "func CanJump(nums []uint) bool",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    input1 := []uint{2, 3, 1, 1, 4}
    fmt.Println(piscine.CanJump(input1))

    input2 := []uint{3, 2, 1, 0, 4}
    fmt.Println(piscine.CanJump(input2))

    input3 := []uint{0}
    fmt.Println(piscine.CanJump(input3))
}`,
                    usageOutput: `true$
false$
true$`
                },
                {
                    id: "chunk",
                    desc: `Write a function called Chunk that receives as parameters a slice, slice []int, and a number size int. The goal of this function is to chunk a slice into many sub slices where each sub slice has the length of size.
                        <ol><li>If the size is 0 it should print a newline ('\n').</li></ol>`,
                    proto: "func Chunk(slice []int, size int) {\n    // ...\n}",
                    usageCode: `package main

func main() {
    Chunk([]int{}, 10)
    Chunk([]int{0, 1, 2, 3, 4, 5, 6, 7}, 0)
    Chunk([]int{0, 1, 2, 3, 4, 5, 6, 7}, 3)
    Chunk([]int{0, 1, 2, 3, 4, 5, 6, 7}, 5)
    Chunk([]int{0, 1, 2, 3, 4, 5, 6, 7}, 4)
}`,
                    usageOutput: `[]$
$
[[0 1 2] [3 4 5] [6 7]]$
[[0 1 2 3 4] [5 6 7]]$
[[0 1 2 3] [4 5 6 7]]$`
                },
                {
                    id: "concatalternate",
                    desc: `Write a function ConcatAlternate() that receives two slices of an int as arguments and returns a new slice with the result of the alternated values of each slice.
                        <ol>
                        <li>The input slices can be of different lengths.</li>
                        <li>The new slice should start with an element of the largest slice.</li>
                        <li>If the slices are of equal length, the new slice should return the elements of the first slice first and then the elements of the second slice.</li>
                        </ol>`,
                    proto: "func ConcatAlternate(slice1, slice2 []int) []int",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Println(ConcatAlternate([]int{1, 2, 3}, []int{4, 5, 6}))
    fmt.Println(ConcatAlternate([]int{2, 4, 6, 8, 10}, []int{1, 3, 5, 7, 9, 11}))
    fmt.Println(ConcatAlternate([]int{1, 2, 3}, []int{4, 5, 6, 7, 8, 9}))
    fmt.Println(ConcatAlternate([]int{1, 2, 3}, []int{}))
}`,
                    usageOutput: `[1 4 2 5 3 6]$
[1 2 3 4 5 6 7 8 9 10 11]$
[4 1 5 2 6 3 7 8 9]$
[1 2 3]$`
                },
                {
                    id: "concatslice",
                    desc: "Write a function ConcatSlice() that takes two slices of integers as arguments and returns the concatenation of the two slices.",
                    proto: "func ConcatSlice(slice1, slice2 []int) []int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.ConcatSlice([]int{1, 2, 3}, []int{4, 5, 6}))
    fmt.Println(piscine.ConcatSlice([]int{}, []int{4, 5, 6, 7, 8, 9}))
    fmt.Println(piscine.ConcatSlice([]int{1, 2, 3}, []int{}))
}`,
                    usageOutput: `[1 2 3 4 5 6]$
[4 5 6 7 8 9]$
[1 2 3]$`
                },
                {
                    id: "fprime",
                    desc: `Write a program that takes a positive int and displays its prime factors, followed by a newline ('\n').
                        <ol>
                        <li>Factors must be displayed in ascending order and separated by *.</li>
                        <li>If the number of arguments is different from 1, if the argument is invalid, or if the integer does not have a prime factor, the program displays nothing.</li>
                        </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage 
$ go run . 225225
3*3*5*5*7*11*13
$ go run . 8333325
3*3*5*5*7*11*13*37
$ go run . 9539
9539
$ go run . 804577
804577
$ go run . 42
2*3*7
$ go run . a
$ go run . 0
$ go run . 1
$`,
                    usageOutput: `3*3*5*5*7*11*13$
3*3*5*5*7*11*13*37$
9539$
804577$
2*3*7$
$
$
$`
                },
                {
                    id: "hiddenp",
                    desc: `
                            Write a program named hiddenp that takes two strings as arguments. The program should check if the first string s1 is hidden in the second s2. s1 is considered hidden in s2 if it is possible to find each character from s1 in s2, in the same order as they appear in s1, but not necessarily consecutively.
                            <ol>
                            <li>If s1 is hidden in s2, the program should display 1 followed by a newline.</li>
                            <li>If s1 is not hidden in s2, the program should display 0 followed by a newline.</li>
                            <li>If s1 is an empty string, it is considered hidden in any string.</li>
                            <li>If the number of arguments is different from 2, the program should display nothing.</li>
                            </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage 

$ go run . "fgex.;" "tyf34gdgf;'ektufjhgdgex.;.;rtjynur6" | cat -e
1$
$ go run . "abc" "2altrb53c.sse" | cat -e
1$
$ go run . "abc" "btarc" | cat -e
0$
$ go run . "DD" "DABC" | cat -e
0$
$ go run .
$`,
                    usageOutput: `1$
1$
0$
0$
$`
                },
                {
                    id: "inter",
                    desc: `Write a program that takes two string and displays, without doubles, the characters that appear in both string, in the order they appear in the first one.
                        <ol>
                        <li>The display will be followed by a newline ('\n').</li>
                        <li>If the number of arguments is different from 2, the program displays nothing.</li>
                        </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage 
$ go run . "padinton" "paqefwtdjetyiytjneytjoeyjnejeyj"
padinto
$ go run . ddf6vewg64f  twthgdwthdwfteewhrtag6h4ffdhsd
df6ewg4
$`,
                    usageOutput: `padinto$
df6ewg4$
$`
                },
                {
                    id: "reversestrcap",
                    desc: `Write a program that takes one or more arguments and that, for each argument, puts the last letter of each word in uppercase and the rest in lowercase. It displays the result followed by a newline ('\n').
                        If there are no argument, the program displays nothing.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . "First SMALL TesT" | cat -e
firsT smalL tesT$
$ go run . "SEconD Test IS a LItTLE EasIEr" "bEwaRe IT'S NoT HARd WhEN " " Go a dernier 0123456789 for the road e" | cat -e
seconD tesT iS A littlE easieR$
bewarE it'S noT harD wheN $
 gO A dernieR 0123456789 foR thE roaD E$
$ go run .
$`,
                    usageOutput: `firsT smalL tesT$
seconD tesT iS A littlE easieR$
bewarE it'S noT harD wheN $
 gO A dernieR 0123456789 foR thE roaD E$
$`
                },
                {
                    id: "saveandmiss",
                    desc: `Write a function called SaveAndMiss() that takes a string and an int as an argument. The function should move through the string in sets determined by the int, saving the first set, omitting the second, saving the third, and so on, in a 'save' and 'miss' fashion until the end of the string is reached. Return a string containing the saved characters.
                        If the int is 0 or a negative number return the original string.`,
                    proto: "func SaveAndMiss(arg string, num int) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.SaveAndMiss("123456789", 3))
    fmt.Println(piscine.SaveAndMiss("abcdefghijklmnopqrstuvwyz", 3))
    fmt.Println(piscine.SaveAndMiss("", 3))
    fmt.Println(piscine.SaveAndMiss("hello you all ! ", 0))
    fmt.Println(piscine.SaveAndMiss("what is your name?", 0))
    fmt.Println(piscine.SaveAndMiss("go Exercise Save and Miss", -5))
}`,
                    usageOutput: `123789$
abcghimnostuz$
$
hello you all ! $
what is your name?$
go Exercise Save and Miss$`
                },
                {
                    id: "union",
                    desc: `Write a program that takes two string and displays, without doubles, the characters that appear in either one of the string.
                        The display will be in the same order that the characters appear on the command line and will be followed by a newline ('\n').
                        If the number of arguments is different from 2, then the program displays a newline ('\n').`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . zpadinton paqefwtdjetyiytjneytjoeyjnejeyj | cat -e
zpadintoqefwjy$
$
$ go run . ddf6vewg64f gtwthgdwthdwfteewhrtag6h4ffdhsd | cat -e
df6vewg4thras$
$
$ go run . rien "cette phrase ne cache rien" | cat -e
rienct phas$
$
$ go run . | cat -e
$
$ go run . rien | cat -e
$`,
                    usageOutput: `zpadintoqefwjy$
$
df6vewg4thras$
$
rienct phas$
$
$
$`
                },
                {
                    id: "wdmatch",
                    desc: `Write a program that takes two string and checks whether it is possible to write the first string with characters from the second string. This rewrite must respect the order in which these characters appear in the second string.

                        If it is possible, the program displays the string followed by a newline ('\n'), otherwise it simply displays nothing.

                        If the number of arguments is different from 2, the program displays nothing.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . 123 123
123
$ go run . faya fgvvfdxcacpolhyghbreda
faya
$ go run . faya fgvvfdxcacpolhyghbred
$ go run . error rrerrrfiiljdfxjyuifrrvcoojh
$ go run . "quarante deux" "qfqfsudf arzgsayns tsregfdgs sjytdekuoixq "
quarante deux
$ go run .
$`,
                    usageOutput: `123$
faya$
$
$
quarante deux$
$
$`
                }
            ],
            6: [
                {
                    id: "fifthandskip",
                    desc: `Write a function FifthAndSkip() that takes a string and returns another string. The function separates every five characters of the string with a space and removes the sixth one.
                        <ol>
                        <li>If there are spaces in the middle of a word, ignore them and get the first character after the spaces until you reach a length of 5.</li>
                        <li>If the string is less than 5 characters return Invalid Input followed by a newline \n.</li>
                        <li>If the string is empty return a newline \n.</li>
                        </ol>`,
                    proto: "func FifthAndSkip(str string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.FifthAndSkip("abcdefghijklmnopqrstuwxyz"))
    fmt.Print(piscine.FifthAndSkip("This is a short sentence"))
    fmt.Print(piscine.FifthAndSkip("1234"))
}`,
                    usageOutput: `abcde ghijk mnopq stuwx z$
Thisi ashor tsent ence$
Invalid Input$
$`
                },
                {
                    id: "notdecimal",
                    desc: `Write a function called NotDecimal() that takes as an argument a string in form of a float number with the decimal point and returns a string converted to int without the decimal point (you will have to multiply it by 10^n to remove the .).
                        <ol>
                        <li>If the number doesn't have a decimal point or there is only a zero after the . return the number followed by a newline \n.</li>
                        <li>If the argument is empty return a newline \n.</li>
                        <li>If the argument is not a number return it followed by a newline \n.</li>
                        </ol>`,
                    proto: "func NotDecimal(str string) string",
                    usageCode: `package main

import (
    "fmt"
)

func main() {
    fmt.Print(NotDecimal("0.1"))
    fmt.Print(NotDecimal("174.2"))
    fmt.Print(NotDecimal("0.1255"))
    fmt.Print(NotDecimal("1.20525856"))
    fmt.Print(NotDecimal("-0.0f00d00"))
    fmt.Print(NotDecimal(""))
    fmt.Print(NotDecimal("-19.525856"))
    fmt.Print(NotDecimal("1952"))
}`,
                    usageOutput: `1$
1742$
1255$
120525856$
-0.0f00d00$
$
-19525856$
1952$
$`
                },
                {
                    id: "revconcatalternate",
                    desc: `Write a function RevConcatAlternate() that receives two slices of int as arguments and returns a new slice with alternated values of each slice in reverse order.
                        <ol>
                        <li>The input slices can have different lengths.</li>
                        <li>The new slice should start with the elements from the largest slice first and when they became equal size slices, it should add an element of the first given slice.</li>
                        <li>If the slices are of equal length, the new slice should start with an element of the first slice.</li>
                        </ol>`,
                    proto: "func RevConcatAlternate(slice1, slice2 []int) []int",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.RevConcatAlternate([]int{1, 2, 3}, []int{4, 5, 6}))
    fmt.Println(piscine.RevConcatAlternate([]int{1, 2, 3}, []int{4, 5, 6, 7, 8, 9}))
    fmt.Println(piscine.RevConcatAlternate([]int{1, 2, 3, 9, 8}, []int{4, 5}))
    fmt.Println(piscine.RevConcatAlternate([]int{1, 2, 3}, []int{}))
}`,
                    usageOutput: `[3 6 2 5 1 4]$
[3 6 2 5 1 4]
[9 8 7 3 6 2 5 1 4]
[8 9 3 2 5 1 4]
[3 2 1]`
                },
                {
                    id: "slice",
                    desc: `The function receives a slice of strings and one or more integers, and returns a slice of strings. The returned slice is part of the received one but cut from the position indicated in the first int, until the position indicated by the second int.
                    In case there only exists one int, the resulting slice begins in the position indicated by the int and ends at the end of the received slice.
                    The integers can be negative.`,
                    proto: "func Slice(a []string, nbrs ...int) []string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main(){
    a := []string{"coding", "algorithm", "ascii", "package", "golang"}
    fmt.Printf("%#v\n", piscine.Slice(a, 1))
    fmt.Printf("%#v\n", piscine.Slice(a, 2, 4))
    fmt.Printf("%#v\n", piscine.Slice(a, -3))
    fmt.Printf("%#v\n", piscine.Slice(a, -2, -1))
    fmt.Printf("%#v\n", piscine.Slice(a, 2, 0))
}`,
                    usageOutput: `[]string{"algorithm", "ascii", "package", "golang"}$
[]string{"ascii", "package"}$
[]string{"ascii", "package", "golang"}$
[]string{"package"}$
[]string(nil)$`
                }
            ],
            7: [
                {
                    id: "findpairs",
                    desc: `Write a program that finds all pairs of elements in an integer array that sum up to a given target value. The program should output a list of pairs, each representing the indices of the elements that form the pair.
                        <ol>
                        <li>Ensure it's possible to have positive or negative integers in the array.</li>
                        <li>Ensure each element is used only once in a pair, although the element can be repeated in different pairs.</li>
                        <li>Allow for multiple pairs to sum up to the target value.</li>
                        <li>Return the message "No pairs found." when no pair is present.</li>
                        <li>Return the message "Invalid target sum." if the target is invalid.</li>
                        <li>Return the message "Invalid number: " if the number in the array is invalid.</li>
                        <li>For any input format that deviates from the specified format "[1, 2, 3, 4, 5]" "6", the program will return an "Invalid input." error message.</li>
                        </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage

$ go run . "[1, 2, 3, 4, 5]" "6"
Pairs with sum 6: [[0 4] [1 3]]
$ go run . "[-1, 2, -3, 4, -5]" "1"
Pairs with sum 1: [[0 1] [2 3]]
$ go run . "[1, 2, 3, 4, 5]" "10"
No pairs found.
$ go run . "[-1, -2, -3, -4, -5]" "-5"
Pairs with sum -5: [[0 3] [1 2]]
$ go run . "[1, 2, 3, 4, 20, -4, 5]" "2 5"
Invalid target sum.
$ go run . "[1, 2, 3, 4, 20, p, 5]" "5"
Invalid number: p
$ go run . "[1, 2, 3, 4" "5"
Invalid input.
$ go run . "1, 2, 3, 4" "5"
Invalid input.
$`,
                    usageOutput: `Pairs with sum 6: [[0 4] [1 3]]$
Pairs with sum 1: [[0 1] [2 3]]$
No pairs found.$
Pairs with sum -5: [[0 3] [1 2]]$
Invalid target sum.$
Invalid number: p$
Invalid input.$
Invalid input.$
$`
                },
                {
                    id: "revwstr",
                    desc: `Write a program that takes a string as a parameter, and prints its words in reverse, followed by a newline.
                        <ol>
                        <li>A word is a sequence of alphanumerical characters.</li>
                        <li>If the number of arguments is different from 1, the program will display nothing.</li>
                        </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage

$ go run . "the time of contempt precedes that of indifference"
indifference of that precedes contempt of time the
$ go run . "abcdefghijklm"
abcdefghijklm
$ go run . "he stared at the mountain"
mountain the at stared he
$ go run . "" | cat-e
$
$`,
                    usageOutput: `indifference of that precedes contempt of time the$
abcdefghijklm$
mountain the at stared he$
$
$`
                },
                {
                    id: "rostring",
                    desc: `Write a program that takes a string and displays this string after rotating it one word to the left.
                        Thus, the first word becomes the last, and others stay in the same order.
                        A word is a sequence of alphanumerical characters.
                        Words will be separated by only one space in the output.
                        If the number of arguments is different from 1, the program displays a newline.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage

$ go run . "abc    " | cat -e
abc$
$ go run . "Let there      be light"
there be light Let
$ go run . "     AkjhZ zLKIJz , 23y"
zLKIJz , 23y AkjhZ
$ go run . | cat -e
$
$`,
                    usageOutput: `abc$
there be light Let$
zLKIJz , 23y AkjhZ$
$
$`
                },
                {
                    id: "wordflip",
                    desc: `Write a function WordFlip() that takes a string as input and returns it in reverse order.
                        <ol>
                        <li>The output should be followed by a newline \n.</li>
                        <li>If the string is empty, return Invalid Output.</li>
                        <li>Ignore multiple spaces between words and trim any leading or trailing spaces in the string.</li>
                        </ol>`,
                    proto: "func WordFlip(str string) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Print(piscine.WordFlip("First second last"))
    fmt.Print(piscine.WordFlip(""))
    fmt.Print(piscine.WordFlip("     "))
    fmt.Print(piscine.WordFlip(" hello  all  of  you! "))
}`,
                    usageOutput: `last second First$
Invalid Output$
Invalid Output$
you! of all hello$
`
                }
            ],
            8: [
                {
                    id: "itoabase",
                    desc: `Write a function that:
                        <ol>
                        <li>converts an int value to a string using the specified base in the argument</li>
                        <li>and that returns this string</li>
                        </ol>
                        The base is expressed as an int, from 2 to 16. The characters comprising the base are the digits from 0 to 9, followed by uppercase letters from A to F.
                        For example, the base 4 would be the equivalent of "0123" and the base 16 would be the equivalent of "0123456789ABCDEF".
                        If the value is negative, the resulting string has to be preceded by a minus sign -.
                        Only valid inputs will be tested.`,
                    proto: "func ItoaBase(value, base int) string",
                    usageCode: `package main

import (
    "fmt"
    "piscine"
)

func main() {
    fmt.Println(piscine.ItoaBase(10, 2))
    fmt.Println(piscine.ItoaBase(255, 16))
    fmt.Println(piscine.ItoaBase(-10, 2))
    fmt.Println(piscine.ItoaBase(15, 4))
}`,
                    usageOutput: `1010$
FF$
-1010$
33$`
                },
                {
                    id: "options",
                    desc: `Write a program that takes an undefined number of arguments which could be considered as options and writes on the standard output a representation of those options as groups of bytes followed by a newline ('\n').
                        <ol>
                        <li>An option is an argument that begins with a - and that can have multiple characters which could be : -abcdefghijklmnopqrstuvwxyz</li>
                        <li>All options are stocked in a single int and each options represents a bit of that int, and should be stocked like this :<br>
                        - 00000000 00000000 00000000 00000000<br>
                        - ******zy xwvutsrq ponmlkji hgfedcba</li>
                        <li>Launching the program without arguments or with the -h flag activated must print all the valid options on the standard output.</li>
                        <li>Please note the -h flag has priority over the others flags when it is called first in one of the arguments.</li>
                        <li>A wrong option must print Invalid Option followed by a newline.</li>
                        </ol>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage

$ go run . | cat -e
options: abcdefghijklmnopqrstuvwxyz$
$ go run . -abc -ijk | cat -e
00000000 00000000 00000111 00000111$
$ go run . -z | cat -e
00000010 00000000 00000000 00000000$
$ go run . -abc -hijk | cat -e
options: abcdefghijklmnopqrstuvwxyz$
$ go run . -h | cat -e
options: abcdefghijklmnopqrstuvwxyz$
$ go run . -zh | cat -e
00000010 00000000 00000000 10000000$
$ go run . -z -h | cat -e
options: abcdefghijklmnopqrstuvwxyz$
$ go run . -hhhhhh | cat -e
options: abcdefghijklmnopqrstuvwxyz$
$ go run . -eeeeee | cat -e
00000000 00000000 00000000 00010000$
$ go run . -% | cat -e
Invalid Option$
$ go run . - | cat -e
Invalid Option$
$`,
                    usageOutput: `options: abcdefghijklmnopqrstuvwxyz$
00000000 00000000 00000111 00000111$
00000010 00000000 00000000 00000000$
options: abcdefghijklmnopqrstuvwxyz$
options: abcdefghijklmnopqrstuvwxyz$
00000010 00000000 00000000 10000000$
options: abcdefghijklmnopqrstuvwxyz$
options: abcdefghijklmnopqrstuvwxyz$
00000000 00000000 00000000 00010000$
Invalid Option$
Invalid Option$
$`
                },
                {
                    id: "piglatin",
                    desc: `Write a program that transforms a string passed as argument in its Pig Latin version.
                        The rules used by Pig Latin are as follows:
                        <ol>
                        <li>If a word begins with a vowel, just add "ay" to the end.</li>
                        <li>If it begins with a consonant, then we take all consonants before the first vowel and we put them on the end of the word and add "ay" at the end.</li>
                        <li>Only the latin vowels will be considered as vowel(aeiou).</li>
                        </ol>
                        If the word has no vowels, the program should print "No vowels".
                        If the number of arguments is different from one, the program prints nothing.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run .
$ go run . pig | cat -e
igpay$
$ go run . Is | cat -e
Isay$
$ go run . crunch | cat -e
unchcray$
$ go run . crnch | cat -e
No vowels$
$ go run . something else | cat -e
$`,
                    usageOutput: `igpay$
Isay$
unchcray$
No vowels$
$`
                },
                {
                    id: "romannumbers",
                    desc: `Write a program called rn. The objective is to convert a number, given as an argument, into a roman number and print it with its roman number calculation.
                        The program should have a limit of 4000. In case of an invalid number, for example "hello" or 0 the program should print ERROR: cannot convert to roman digit.
                        <table class="roman-table">
                        <tr><th>Value</th><th>Symbol</th><th>Value</th><th>Symbol</th><th>Value</th><th>Symbol</th></tr>
                        <tr><td>1</td><td>I</td><td>11</td><td>XI</td><td>21</td><td>XXI</td></tr>
                        <tr><td>2</td><td>II</td><td>12</td><td>XII</td><td>22</td><td>XXII</td></tr>
                        <tr><td>3</td><td>III</td><td>13</td><td>XIII</td><td>23</td><td>XXIII</td></tr>
                        <tr><td>4</td><td>IV</td><td>14</td><td>XIV</td><td>24</td><td>XXIV</td></tr>
                        <tr><td>5</td><td>V</td><td>15</td><td>XV</td><td>25</td><td>XXV</td></tr>
                        <tr><td>6</td><td>VI</td><td>16</td><td>XVI</td><td>26</td><td>XXVI</td></tr>
                        <tr><td>7</td><td>VII</td><td>17</td><td>XVII</td><td>27</td><td>XXVII</td></tr>
                        <tr><td>8</td><td>VIII</td><td>18</td><td>XVIII</td><td>28</td><td>XXVIII</td></tr>
                        <tr><td>9</td><td>IX</td><td>19</td><td>XIX</td><td>29</td><td>XXIX</td></tr>
                        <tr><td>10</td><td>X</td><td>20</td><td>XX</td><td>30</td><td>XXX</td></tr>
                        </table>`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . hello
ERROR: cannot convert to roman digit
$ go run . 123
C+X+X+I+I+I
CXXIII
$ go run . 999
(M-C)+(C-X)+(X-I)
CMXCIX
$ go run . 3999
M+M+M+(M-C)+(C-X)+(X-I)
MMMCMXCIX
$ go run . 4000
ERROR: cannot convert to roman digit
$`,
                    usageOutput: `ERROR: cannot convert to roman digit$
C+X+X+I+I+I$
CXXIII$
(M-C)+(C-X)+(X-I)$
CMXCIX$
M+M+M+(M-C)+(C-X)+(X-I)$
MMMCMXCIX$
ERROR: cannot convert to roman digit$
$`
                }
            ],
            9: [
                {
                    id: "brackets",
                    desc: `Write a program that takes an undefined number of string in arguments. For each argument, if the expression is correctly bracketed, the program prints on the standard output OK followed by a newline ('\n'), otherwise it prints Error followed by a newline.
                        Symbols considered as brackets are parentheses ( and ), square brackets [ and ] and curly braces { and }. Every other symbols are simply ignored.
                        An opening bracket must always be closed by the good closing bracket in the correct order. A string which does not contain any bracket is considered as a correctly bracketed string.
                        If there is no argument, the program must print nothing.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage

$ go run . '(johndoe)' | cat -e
OK$
$ go run . '([)]' | cat -e
Error$
$ go run . '' '{[(0 + 0)(1 + 1)](3*(-1)){()}}' | cat -e
OK$
OK$
$ go run .
$`,
                    usageOutput: `OK$
Error$
OK$
OK$
$`
                },
                {
                    id: "rpncalc",
                    desc: `Write a program that takes a string which contains an equation written in Reverse Polish Notation (RPN) as its first argument, that evaluates the equation, and that prints the result on the standard output followed by a newline ('\n').
                        Reverse Polish Notation is a mathematical notation in which every operator follows all of its operands. In RPN, every operator encountered evaluates the previous 2 operands, and the result of this operation then becomes the first of the two operands for the subsequent operator. Operands and operators must be spaced by at least one space.
                        The following operators must be implemented : +, -, *, /, and %.
                        If the string is not valid or if there is not exactly one argument, Error must be printed on the standard output followed by a newline. If the string has extra spaces it is still considered valid.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `Usage

$ go run . "1 2 * 3 * 4 +" | cat -e
10$
$ go run . "1 2 3 4 +" | cat -e
Error$
$ go run . | cat -e
Error$
$ go run . "     1       3 * 2 -" | cat -e
1
$ go run . "     1       3 * ksd 2 -" | cat -e
Error$
$`,
                    usageOutput: `10$
Error$
Error$
1$
Error$
$`
                }
            ],
            10: [
                {
                    id: "brainfuck",
                    desc: `Write a Brainfuck interpreter program.
                        The source code will be given as the first parameter, and will always be valid with fewer than 4096 operations.
                        Your Brainfuck interpreter will consist of an array of 2048 bytes, all initialized to 0, with a pointer to the first byte.
                        Every operator consists of a single character:
                        1. >: increment the pointer.
                        2. <: decrement the pointer.
                        3. +: increment the pointed byte.
                        4. -: decrement the pointed byte.
                        5. .: print the pointed byte to standard output.
                        6. [: If the byte at the current pointer is 0, skip forward to the command after the matching ].
                        7. ]: If the byte at the current pointer is not 0, jump back to the command after the matching [.
                        8. Any other character is treated as a comment and ignored.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>." | cat -e
Hello World!$
$ go run . "+++++[>++++[>++++H>+++++i<<-]>>>++\n<<<<-]>>--------.>+++++.>." | cat -e
Hi$
$ go run . "++++++++++[>++++++++++>++++++++++>++++++++++<<<-]>---.>--.>-.>++++++++++." | cat -e
abc$
$ go run .
$`,
                    usageOutput: `Hello World!$
Hi$
abc$
$`
                },
                {
                    id: "grouping",
                    desc: `Write a program that receives two strings and replicates the use of brackets in regular expressions. Brackets in regular expressions returns the words that contain the expression inside of it.
                        The program should handle the "|" operator, which searches for both strings on each side of the operator.
                        The output of the program should be, the results of the regular expression, numbered and displayed by the order of appearance in the string.
                        If the number of arguments is different from 2, if the regular expression is not valid, if the last argument is empty or if there are no matches, the program should print nothing.`,
                    proto: "package main\n\nfunc main() {\n    // ...\n}",
                    usageCode: `usage
$ go run . "(a)" "I'm heavy, jumpsuit is on steady, Lighter when I'm lower, higher when I'm heavy"
1: heavy
2: steady
3: heavy
$ go run . "(e|n)" "I currently have 4 windows opened up… and I don’t know why."
1: currently
2: currently
3: have
4: windows
5: opened
6: opened
7: and
8: don’t
9: know
$ go run . "(hi)" "He swore he just saw his sushi move."
1: his
2: sushi
$ go run . "(s)" ""
$ go run . "i" "Something in the air"
$`,
                    usageOutput: `1: heavy$
2: steady$
3: heavy$
1: currently$
2: currently$
3: have$
4: windows$
5: opened$
6: opened$
7: and$
8: don’t$
9: know$
1: his$
2: sushi$
$`
                }
            ]
        }

        function showDashboard() {
            document.getElementById('dashboard-view').classList.remove('hidden');
            document.getElementById('detail-view').classList.add('hidden');
            window.scrollTo(0, 0);
        }

        function openLevel(level) {
            document.getElementById('dashboard-view').classList.add('hidden');
            document.getElementById('detail-view').classList.remove('hidden');
            document.getElementById('detail-title').innerText = "Question " + level;

            const container = document.getElementById('questions-container');
            container.innerHTML = ''; // Clear previous

            const questions = questionsData[level] || [];

            questions.forEach((q, index) => {
                const item = document.createElement('div');
                item.className = 'accordion-item';

                // Dynamic Usage Section Generation
                let usageSection = '';
                
                if (q.usageCode) {
                    if (q.usageCode.toLowerCase().startsWith("usage")) {
                         // Case for CLI examples provided as raw text
                         usageSection = `
                            <h3>Usage Example</h3>
                            <pre style="background: #000; border: 1px solid #30363d;">${q.usageCode}</pre>
                        `;
                    } else {
                        // Case for Go functions with main code provided
                        usageSection = `
                            <h3>Main for Testing</h3>
                            <pre><code class="language-go">${q.usageCode}</code></pre>
                        `;
                    }

                    // Only add output if it exists
                    if (q.usageOutput) {
                        usageSection += `
                            <h3>Expected Output</h3>
                            <pre style="background: #000; border: 1px solid #30363d;">${q.usageOutput}</pre>
                        `;
                    }
                } else {
                    // Fallback to the generic message if no test code is provided
                    usageSection = `
                        <h3>Usage Example</h3>
                        <pre>$ go run . 
(Output depends on specific logic...)</pre>
                    `;
                }

                const fullSubject = `
                    <h3>Instructions</h3>
                    <div class="description-content">${q.desc}</div>
                    
                    <h3>Expected Function / Program</h3>
                    <pre><code class="language-go">${q.proto}</code></pre>
                    
                    ${usageSection}
                `;

                item.innerHTML = `
                    <div class="accordion-header" onclick="toggleAccordion(this)">
                        ${q.id}
                        <span style="font-size: 0.8em; color: var(--text-muted);">▼</span>
                    </div>
                    <div class="accordion-content">
                        <div class="subject-text">
                            ${fullSubject}
                        </div>
                    </div>
                `;
                container.appendChild(item);
            });
        }

        function toggleAccordion(header) {
            const content = header.nextElementSibling;

            // Close others
            const allContents = document.querySelectorAll('.accordion-content');
            allContents.forEach(c => {
                if (c !== content) c.classList.remove('active');
            });

            content.classList.toggle('active');
        }
    </script>
</body>

</html>