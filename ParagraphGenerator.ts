enum Gender {
    Male, Female
}

class ParagraphGenerator {
    private sentences: Array<Array<string>> = [];

    private personalPronoun: string = "";
    private personalPronounC: string = "";
    
    private possessivePronoun: string = "";
    private possessivePronounC: string = "";

    private objectivePronoun: string = "";
    private objectivePronounC: string = "";

    private problems: Array<Array<string>> = [];
    private treatments: Array<Array<string>> = [];

    private name: string = "";
    private gender: Gender = Gender.Male;

    constructor(name: string, gender: Gender) {
        this.name = name;
        this.gender = gender;
        this.initPronouns()
        this.initSentences();
        this.initProblemTreatments();
    }
    public generateParagraph() : string {
        let paragraph: string = "";
        let problemTreatment1: string = this.generateProblemTreatment();
        let problemTreatment2: string = this.generateProblemTreatment();

        while (problemTreatment1 == problemTreatment2) {
            problemTreatment2 = this.generateProblemTreatment();
        }

        paragraph += this.getRandom(this.sentences[0]) + " ";
        paragraph += this.getRandom(this.sentences[1]) + " ";
        paragraph += this.getRandom(this.sentences[2]) + " ";
        paragraph += problemTreatment1 + " ";
        paragraph += problemTreatment2 + " ";
        paragraph += this.getRandom(this.sentences[3]) + " ";
        paragraph += this.getRandom(this.sentences[4]) + " ";
        return paragraph;
    }
    private generateProblemTreatment(): string {
        let sentence: string = "";
        let index: number = Math.floor((Math.random() * this.problems.length));
        sentence = this.getRandom(this.problems[index]) + " " + this.getRandom(this.treatments[index]);
        return sentence;
    }
    private getRandom(array: Array<any>) : any {
        return array[Math.floor((Math.random() * array.length))];
    }
    private initPronouns() {
        // scuffed
        this.personalPronoun = (this.gender == Gender.Male) ? "he" : "she"
        this.personalPronounC = (this.gender == Gender.Male) ? "He" : "She"

        this.possessivePronoun = (this.gender == Gender.Male) ? "his" : "her"
        this.possessivePronounC = (this.gender == Gender.Male) ? "His" : "Her"

        this.objectivePronoun = (this.gender == Gender.Male) ? "him" : "her"
        this.objectivePronounC = (this.gender == Gender.Male) ? "Him" : "Her"
    }
    private initSentences() {
        // intro 1
        this.sentences.push([`SW met with ${this.name} for monthly individual counseling.`]);
        // intro 2
        this.sentences.push([
            `${this.personalPronounC} appeared calm and receptive when approached by SW for the meeting.`,
            `${this.personalPronounC} appeared attentive and calm when approached by SW for the meeting.`,
            `${this.personalPronounC} appeared calm and friendly when approached by SW for the meeting.`,
            `${this.personalPronounC} appeared calm and alert during the meeting.`
        ]);
        // intro 3
        this.sentences.push([
            `SW inquired about ${this.name}'s overall health and wellbeing in the past month. ${this.personalPronounC} denied any major significant changes to ${this.possessivePronoun} overall health status or routine within the past month.`,
            `SW inquired about ${this.name}'s overall health and wellbeing in the past month. ${this.personalPronounC} denied any major significant changes to ${this.possessivePronoun} overall health status or routine recently.`,
            `SW inquired about ${this.possessivePronoun} overall health status and wellbeing in the past month. ${this.personalPronounC} reported to be in a stable status in mood and health.`,
            `${this.personalPronounC} expressed being satisfied and content with ${this.possessivePronoun} progress and life overall.`
        ]);

        // patient response
        this.sentences.push([
            `${this.name} was accepting of the support and care.`,
            `${this.name} was appreciative and thankful for the support and interventions.`,
            `${this.personalPronounC} was accepting of the care and interventions.`,
            `${this.name} was appreciative and accepting of the care.`,
            `${this.name} was thankful and accepting for the session.`
        ]);

        // conclusion
        this.sentences.push([
            `SW will continue to monitor ${this.name}'s psychosocial mood status while providing case management assistance as needed.`,
            `SW will continue to monitor ${this.name}'s mood status and provide individual counseling regularly.`
        ]);
    }
    private initProblemTreatments() {
        this.problems[0] = [
            `However, ${this.personalPronoun} reported having a fall at home with no hospitalizations. ${this.personalPronounC} expressed worry about ${this.possessivePronoun} physical health decline with age and further risk of fall.`,
            `${this.name} reported having multiple near fall incidents and continues to be at risk of fall.`
        ]
        this.treatments[0] = [
            `SW reinforced proper fall prevention and precaution techniques to reduce the risk of future fall.`,
            `SW educated ${ this.name } on fall prevention and precaution techniques, such as properly using ${ this.possessivePronoun } walking device to reduce the risk of future fall.`
        ]


        this.problems[1] = [
            `However, ${this.name} expressed negative feelings and concern toward ${this.possessivePronoun} health decline related to aging.`,
            `However, ${this.personalPronoun} expressed concern and worry that ${this.personalPronoun}’ll become a burden on ${this.possessivePronoun} family due to ${this.possessivePronoun} further aging and physical health decline.`,
            `However, ${this.personalPronoun} expressed concern about further physical decline related to aging.`
        ]
        this.treatments[1] = [
            `SW provided the opportunity for ${this.name} to vent ${this.personalPronoun} negative feelings appropriately, through use of empathy, active listening, and positive feedback.`,
            `SW provided the opportunity for ${this.objectivePronoun} to vent ${this.personalPronoun} inner feelings appropriately through use of active listening, empathy, and positive feedback.`,
            `SW provided emotional support through use of active listening, empathy, and validation.`,
            `SW reinforced coping skills and relaxation techniques to help ${this.name} manage the symptoms and difficulties of aging.`,
            `SW encouraged ${this.name} to keep active participation in the Center’s activities in order to stay positive about the aging process and take ${this.personalPronoun} mind off of the negative symptoms.`
        ]


        this.problems[2] = [
            `${this.name} complained about having sleep problems, only getting a few hours of sleep per night with frequent urination.`,
            `${this.personalPronounC} complained about having poor sleep, only getting 4-5 hours of sleep per night and having at least 3x nocturia.`,
            `${this.personalPronounC} complained about having trouble sleeping at night, getting less hours of sleep per night than he did before, citing the recent cold weather as a factor.`
        ]
        this.treatments[2] = [
            `SW reinforced proper sleep hygiene and relaxation techniques to help with the sleeping problems.`,
            `SW taught ${this.objectivePronoun} sleep hygiene and relaxation techniques such as stretching before bed, to help with sleep problems.`,
            `SW encouraged relaxation and breathing techniques such as stretching or taking a warm bath before bed to increase sleep quality.`
        ]


        this.problems[3] = [
            `${this.name} complained about joint pain and leg weakness, which has affected ${this.possessivePronoun} mood. ${this.personalPronounC} cites the recent cold weather as a factor.`,
            `${this.name} complained about somatic pain related to aging and expressed worry about aging. ${this.personalPronounC} stated that on some days, ${this.possessivePronoun} mood was affected negatively by ${this.possessivePronoun} somatic pain.`
        ]
        this.treatments[3] = [
            `SW provided the opportunity for ${this.name} to vent ${this.possessivePronoun} negative feelings appropriately, through use of empathy, active listening, and positive feedback.`,
            `SW provided the opportunity for ${this.objectivePronoun} to vent ${this.possessivePronoun} inner feelings appropriately through use of active listening, empathy, and positive feedback.`,
            `SW provided emotional support through use of active listening, empathy, and validation.`
        ]


        this.problems[4] = [
            `${this.personalPronounC} complained about having hard of hearing, leading to frustration and difficulty communicating with others.`,
        ]
        this.treatments[4] = [
            `SW provided a quiet environment for ${this.objectivePronoun} to communicate and be understood easily, letting ${this.objectivePronoun} express ${this.possessivePronoun} feelings through active listening.`,
            `SW provided a quiet place for ${this.objectivePronoun} to talk and listen clearly, as well as providing emotional support.`
        ]


        this.problems[5] = [
            `${this.personalPronounC} complained about memory loss, which often leads to confusion and misplacing of personal possessions.`
        ]
        this.treatments[5] = [
            `SW encouraged ${this.name} to maintain active participation in the Center’s activities and exercises as a form of mental and cognitive stimulation.`,
            `SW provided reality orientation and offered opportunity to reminiscence as a form of cognitive stimulation.`
        ]


        this.problems[6] = [
            `${this.name} expressed feelings of loneliness and isolation.`,
            `${this.name} remained mostly quiet and said few words. ${this.name} seems to lack motivation for social interaction.`
        ]
        this.treatments[6] = [
            `SW encouraged ${this.name} to keep active participation in the Center’s activities and interaction with peers to reduce feelings of loneliness. SW also provided emotional support through use of active listening, empathy, and validation.`
        ]
    }
}