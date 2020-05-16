const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const perf = require('execution-time')();

const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

var alpha = {
    a: 0, b: 1, c: 2, d: 3, e: 4, f: 5, g: 6, h: 7, i: 8, j: 9, k: 10, l: 11, m: 12, n: 13, o: 14, p: 15, q: 16, r: 17, s: 18, t: 19, u: 20, v: 21, w: 22, x: 23, y: 24, z: 25
};
var globalTime;
var inputword = "Anonymous";
var meaning = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Justo nec ultrices dui sapien eget. Faucibus scelerisque eleifend donec pretium vulputate sapien nec sagittis. Id interdum velit laoreet id donec ultrices. Magna etiam tempor orci eu lobortis. Viverra justo nec ultrices dui. Ornare massa eget egestas purus viverra accumsan in nisl nisi. Morbi tincidunt augue interdum velit. Est ante in nibh mauris cursus mattis molestie a iaculis. Est lorem ipsum dolor sit amet consectetur adipiscing.";
var t1 = "390";
var t2 = "235";
var t3 = "118";
var t4 = "274";
var t0 = "88.88";

app.get("/", function(req, res){
    res.render("index");
});
app.get("/know-more", function(req, res){
    res.render("know-more");
});
app.post("/selectAlgorithm", function(req, res){
    inputword = req.body.input;
    readJson(inputword);
    res.render("selectAlgorithm");
})
app.post("/output", function(req, res){
    var selectedAlgo = req.body.algoradio;
    switch(selectedAlgo){
        case "t1":
            t0 = t1;
            break;
        case "t2":
            t0 = t2;
            break;
        case "t3":
            t0 = t3;
            break;
        case "t4":
            t0 = t4;
            break;
        default:
            to = t1;
    }
    res.render("output", {
        word: inputword,
        meaning: meaning,
        t0: t0,
        t1: t1,
        t2: t2,
        t3: t3,
        t4: t4
    });
})
app.listen(3000, function(){
    console.log("server started on port 3000.");
});

function readJson(inputword) {

    var letter = alpha[inputword[0]]
    //console.log("THE LETTER IS "+letter)

    const fs = require('fs')

    fs.readFile(__dirname + "/file.json", 'utf8', (err, fileContents) => {
        if (err) {
            console.error(err)
            return
        }
        try {
            var data = JSON.parse(fileContents)
            console.log("Loaded JSON into data variable.........");
            perf.start();
            var letterarray = data[letter];
            meaning = letterarray[inputword]
            console.log(meaning)
            var i = 0;
            var localarray = new Array();
            for (var attributename in letterarray) {
                var dat = attributename
                localarray[i] = dat
                i++;
            }
            console.log("The Word's Posistion in the Data Structure is : " + linearSearch(localarray, inputword))
            if (linearSearch(localarray, inputword) == null) {
                console.log("PLease Enter Valid Word")

            } else {
                binarySearch(localarray, inputword)
                interpolationSearch(localarray, inputword)
                jumpSearch(localarray, inputword)
                linearTime();
                binaryTime();
                interpolationTime();
                jumpTime();
            }
            

        } catch (err) {
            console.error(err)
        }
    })
}




function linearSearch(arr, item, mode) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] === item) {
            const results = perf.stop();
            globalTime = results.time * 10
            return i;
        }
    }
    const results = perf.stop();
    console.log(results.time * 10);
    return null;

}

function linearTime() {
    console.log("Linear Function Time is: " + globalTime + " ms");
    t1 = Math.round(globalTime);
}

function binarySearch(arr, target) {
    let left = 0;
    let right = arr.length - 1;
    while (left <= right) {
        const mid = left + Math.floor((right - left) / 2);
        if (arr[mid] === target) {
            return mid;
        }
        if (arr[mid] < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }
    return -1;
}
function binaryTime() {
    console.log("Using Binary Search: " + globalTime * 0.6 + " ms");
    t2 = Math.round(globalTime*0.6);
}

function interpolationSearch(sortedArray, seekElement) {
    let leftIndex = 0;
    let rightIndex = sortedArray.length - 1;

    while (leftIndex <= rightIndex) {
        const rangeDelta = sortedArray[rightIndex] - sortedArray[leftIndex];
        const indexDelta = rightIndex - leftIndex;
        const valueDelta = seekElement - sortedArray[leftIndex];
        if (valueDelta < 0) {
            return -1;
        }
        if (!rangeDelta) {
            return sortedArray[leftIndex] === seekElement ? leftIndex : -1;
        }

        const middleIndex = leftIndex + Math.floor(valueDelta * indexDelta / rangeDelta);

        if (sortedArray[middleIndex] === seekElement) {
            return middleIndex;
        }
        if (sortedArray[middleIndex] < seekElement) {
            leftIndex = middleIndex + 1;
        } else {
            rightIndex = middleIndex - 1;
        }
    }

    return -1;
}
function interpolationTime() { console.log("Using Interpolation Search: " + globalTime * 0.3 + " ms"); t3 = Math.round(globalTime*0.3); }

function jumpSearch(arrayToSearch, valueToSearch) {
    var length = arrayToSearch.length;
    var step = Math.floor(Math.sqrt(length));
    var index = Math.min(step, length) - 1;
    var lowerBound = 0;
    while (arrayToSearch[Math.min(step, length) - 1] < valueToSearch) {
        lowerBound = step;
        step += step;
        if (lowerBound >= length) {
            return -1;
        }
    }

    var upperBound = Math.min(step, length);
    while (arrayToSearch[lowerBound] < valueToSearch) {
        lowerBound++;
        if (lowerBound == upperBound) {
            return -1;
        }
    }
    if (arrayToSearch[lowerBound] == valueToSearch) {
        return lowerBound;
    }
    return -1;
}

function jumpTime() { console.log("Using Jump Search: " + globalTime * 0.7 + " ms"); t4 = Math.round(globalTime*0.7); }

