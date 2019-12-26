"use strict";
var Gender;
(function (Gender) {
    Gender[Gender["Male"] = 0] = "Male";
    Gender[Gender["Female"] = 1] = "Female";
    Gender[Gender["Other"] = 2] = "Other";
})(Gender || (Gender = {}));
var ParagraphGenerator = (function () {
    function ParagraphGenerator(name, gender) {
        this.name = "";
        this.gender = Gender.Male;
        this.sentences = [];
        this.problems = {};
        this.name = name;
        this.gender = gender;
    }
    ParagraphGenerator.prototype.generateParagraph = function (problem1, problem2) {
        if (problem1 === void 0) { problem1 = ""; }
        if (problem2 === void 0) { problem2 = ""; }
        if (problem1 == "" && problem2 == "") {
            problem1 = this.getRandom(this.getProblemTypes());
            problem2 = this.getRandom(this.getProblemTypes());
            while (problem1 == problem2) {
                problem2 = this.getRandom(this.getProblemTypes());
            }
        }
        if (problem1 == "") {
            problem1 = this.getRandom(this.getProblemTypes());
        }
        if (problem2 == "") {
            problem2 = this.getRandom(this.getProblemTypes());
        }
        var paragraph = "";
        var problemTreatment1 = this.generateProblemTreatment(problem1);
        var problemTreatment2 = this.generateProblemTreatment(problem2);
        while (problemTreatment1 == problemTreatment2) {
            problemTreatment2 = this.generateProblemTreatment(problem2);
        }
        paragraph += this.convertSentence(this.getRandom(this.sentences[0]) + " ");
        paragraph += this.convertSentence(this.getRandom(this.sentences[1]) + " ");
        paragraph += this.convertSentence(this.getRandom(this.sentences[2]) + " ");
        paragraph += "However, ";
        paragraph += this.convertSentence(problemTreatment1 + " ");
        paragraph += "Also, ";
        paragraph += this.convertSentence(problemTreatment2 + " ");
        paragraph += this.convertSentence(this.getRandom(this.sentences[3]) + " ");
        paragraph += this.convertSentence(this.getRandom(this.sentences[4]) + " ");
        return paragraph;
    };
    ParagraphGenerator.prototype.getProblemTypes = function () {
        var problemTypes = [];
        for (var problemType in this.problems) {
            problemTypes.push(problemType);
        }
        return problemTypes;
    };
    ParagraphGenerator.prototype.loadSentences = function (url) {
        var _this = this;
        return $.getJSON(url, function (data) {
            _this.sentences = data;
        });
    };
    ParagraphGenerator.prototype.loadProblemTreatments = function (url) {
        var _this = this;
        return $.getJSON(url, function (data) {
            _this.problems = data;
        });
    };
    ParagraphGenerator.prototype.updateName = function (name) {
        this.name = name;
    };
    ParagraphGenerator.prototype.updateGender = function (gender) {
        this.gender = gender;
    };
    ParagraphGenerator.prototype.generateProblemTreatment = function (problemType) {
        var sentence = "";
        var problem = this.getRandom(this.problems[problemType]["problems"]);
        var treatment = this.getRandom(this.problems[problemType]["treatments"]);
        sentence = problem + " " + treatment;
        return sentence;
    };
    ParagraphGenerator.prototype.getRandom = function (array) {
        return array[Math.floor((Math.random() * array.length))];
    };
    ParagraphGenerator.prototype.convertSentence = function (sentence) {
        sentence = sentence.replace(/_/g, this.name);
        var personalPronounsLower = /\bhe\b|\bshe\b|\bthey\b/g;
        var personalPronounsUpper = /\bHe\b|\bShe\b|\bThey\b/g;
        var possesivePronounsLower = /\bhis\b|\bher\b|\btheir\b/g;
        var possesivePronounsUpper = /\bHis\b|\bHer\b|\bTheir\b/g;
        var objectPronounsLower = /\bhim\b|\bher\b|\bthem\b/g;
        var objectPronounsUpper = /\bHim\b|\bHer\b|\bThem\b/g;
        switch (this.gender) {
            case Gender.Male:
                sentence = sentence.replace(personalPronounsLower, "he");
                sentence = sentence.replace(personalPronounsUpper, "He");
                sentence = sentence.replace(possesivePronounsLower, "his");
                sentence = sentence.replace(possesivePronounsUpper, "His");
                sentence = sentence.replace(objectPronounsLower, "him");
                sentence = sentence.replace(objectPronounsUpper, "Him");
                break;
            case Gender.Female:
                sentence = sentence.replace(personalPronounsLower, "she");
                sentence = sentence.replace(personalPronounsUpper, "She");
                sentence = sentence.replace(possesivePronounsLower, "her");
                sentence = sentence.replace(possesivePronounsUpper, "Her");
                sentence = sentence.replace(objectPronounsLower, "her");
                sentence = sentence.replace(objectPronounsUpper, "Her");
                break;
            default:
                sentence = sentence.replace(personalPronounsLower, "they");
                sentence = sentence.replace(personalPronounsUpper, "They");
                sentence = sentence.replace(possesivePronounsLower, "their");
                sentence = sentence.replace(possesivePronounsUpper, "Their");
                sentence = sentence.replace(objectPronounsLower, "them");
                sentence = sentence.replace(objectPronounsUpper, "Them");
                break;
        }
        return sentence;
    };
    return ParagraphGenerator;
}());
