enum Gender {
    Male, Female, Other
}

class ParagraphGenerator {
    private name: string = "";
    private gender: Gender = Gender.Male;
    private sentences: Array<Array<string>> = [];
    private problems: { [key: string]: { [key: string]: Array<string> } } = {}

    /**
     * @param name Name of the patient
     * @param gender Gender of the patient
     */
    constructor(name: string, gender: Gender) {
        this.name = name;
        this.gender = gender;
    }

    /**
     * Generates a complete paragraph
     * @param problem1 the first problem type (blank for random)
     * @param problem2 the second problem type (blank for random)
     * @returns a string containing the complete paragraph
     */
    public generateParagraph(problem1: string = "", problem2: string = ""): string {
        // if "any" is selected for both problems, we dont want the same type
        // for both
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

        let paragraph: string = "";
        let problemTreatment1: string = this.generateProblemTreatment(problem1);
        let problemTreatment2: string = this.generateProblemTreatment(problem2);

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
    }

    /**
     * Returns a list of available problem types
     * @returns the list of available problem types
     */
    public getProblemTypes(): Array<string> {
        let problemTypes: Array<string> = [];
        for (let problemType in this.problems) {
            problemTypes.push(problemType);
        }
        return problemTypes;
    }

    /**
     * Loads a json file containing the sentence bank from a url
     * @param url the url to load from
     * @returns a promise for the ajax request
     */
    public loadSentences(url: string): JQueryXHR {
        return $.getJSON(url, (data) => {
            this.sentences = data;
        });
    }

    /**
     * Loads a json file containing the problem-treatment bank from a url
     * @param url the url to load from
     * @returns a promise for the ajax request
     */
    public loadProblemTreatments(url: string): JQueryXHR {
        return $.getJSON(url, (data) => {
            this.problems = data;
        });
    }

    /**
     * Updates name
     * @param name
     */
    public updateName(name: string): void {
        this.name = name;
    }
    /**
     * Updates gender
     * @param gender 
     */
    public updateGender(gender: Gender): void {
        this.gender = gender;
    }

    /**
    * Generates a problem and treatment pair
    * @param problemType the type of problem-treatment to generate
    * @returns a string containing the problem and treatment
    */
    private generateProblemTreatment(problemType: string): string {
        let sentence: string = "";
        let problem = this.getRandom(this.problems[problemType]["problems"]);
        let treatment = this.getRandom(this.problems[problemType]["treatments"]);

        sentence = problem + " " + treatment;
        return sentence;
    }

    /**
     * Returns a random element in an array
     * @param array The array to pick from
     * @returns an element from the array
     */
    private getRandom<T>(array: Array<T>): T {
        return array[Math.floor((Math.random() * array.length))];
    }

    /**
     * Converts the pronouns and fills in the names of a sentence
     * @param sentence the input sentence
     * @returns a sentence with the pronouns and _'s replaced
     */
    private convertSentence(sentence: String): String {
        // Fill in names
        sentence = sentence.replace(/_/g, this.name);

        // Pronoun regex patterns (there might be a cleaner way to do this)
        // Personal pronouns
        let personalPronounsLower = /\bhe\b|\bshe\b|\bthey\b/g;
        let personalPronounsUpper = /\bHe\b|\bShe\b|\bThey\b/g;
        // Possessive pronouns
        let possesivePronounsLower = /\bhis\b|\bher\b|\btheir\b/g;
        let possesivePronounsUpper = /\bHis\b|\bHer\b|\bTheir\b/g;
        // Object pronouns
        let objectPronounsLower = /\bhim\b|\bher\b|\bthem\b/g;
        let objectPronounsUpper = /\bHim\b|\bHer\b|\bThem\b/g;

        // Convert pronouns
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
    }
}