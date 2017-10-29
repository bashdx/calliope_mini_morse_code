//Konstanten für die Ausgabe definieren
//Define constants for output

//Das Verhältnis von Strich zu Punkt ist 3 - das heisst, ein Strich dauert dreimal so lange wie ein Punkt
//Relation of Dash to Dot is 3 - this means a dash lasts three times a dot
const DASHDURATIONFACTOR: number = 3;

//Die LED-Farbe für den Strich
//LED color for dash
const LEDCOLORDASH: Colors = Colors.Red;

//Die LED-Farbe für den Punkt
//LED color for dot
const LEDCOLORDOT: Colors = Colors.Green;

//Die Länge eines Punkts in Millisekunden
//The duration of a dot in milli seconds
const DOTDURATION: number = 333;

//Die Frequenz in Hertz (Hz) für den Punkt
//The frequency in Hertz (Hz) for the dot
const TONEFREQUENCYDOT: number = 440;

//Die Frequenz in Hertz (Hz) für den Strich
//The frequency in Hertz (Hz) for the dash
const TONEFREQUENCYDASH: number = 880;

//Es gibt zwei Zeichen - lang (Strich), kurz (Punkt)
//There are two signs available - long (dash), short (dot)
enum MorseTones {
    Dot,
    Dash
};

//Die Klasse MorseSign bildet ein einzelnes Morsezeichen ab
//The class MorseSign handles a single morse sign
class MorseSign {

    //Die Kombination aus Punkten und Strichen, die das Zeichen abbilden
    //The combination from dots and dashes forming the morse sign
    private _morseTones: MorseTones[];

    //Die Darstellung des Morsezeichens als ASCII-Zeichen
    //The representation of the morse sign as ASCII character
    private _morseCharacter: string;

    //Konstruktor, initialisieren der Felder
    //Constructor, intialize the fields
    constructor(morseTones: MorseTones[], morseCharacter: string) {
        this._morseTones = morseTones;
        this._morseCharacter = morseCharacter;
    }

    get Tones(): MorseTones[] {
        return this._morseTones;
    }

    get Character(): string {
        return this._morseCharacter;
    }
}
;

//Die für die Anwendung verfügbaren Morsezeichen
//The morse signs available to the application
const MorseSigns: MorseSign[] =
    [
        new MorseSign([MorseTones.Dot, MorseTones.Dash], 'A'),
        new MorseSign([MorseTones.Dash, MorseTones.Dot, MorseTones.Dot, MorseTones.Dot], 'B'),
        new MorseSign([MorseTones.Dash, MorseTones.Dot, MorseTones.Dash, MorseTones.Dot], 'C'),
        new MorseSign([MorseTones.Dash, MorseTones.Dot, MorseTones.Dot], 'D'),
    ];

/*abstract class MorseSignPlayer {

    public abstract startPlay(): void;

    public abstract stopPlay(): void;

    constructor() {

    }
}*/

/*class LedMorseSignPlayer extends MorseSignPlayer {

    public startPlay(): void {
        basic.setLedColor(LEDCOLOR);
    }

    public stopPlay(): void {
        basic.setLedColor(0);
    }

    constructor() {
        super();
    }
}*/

class LedMorseSignPlayer {

    public startPlay(morseTone: MorseTones): void {
        if (morseTone == MorseTones.Dot) {
            basic.setLedColor(LEDCOLORDOT);
        } else {
            basic.setLedColor(LEDCOLORDASH);
        }
    }

    public stopPlay(): void {
        basic.setLedColor(0);
    }
}

/*
class ToneMorseSignPlayer extends MorseSignPlayer {

    public startPlay(): void {
        music.ringTone(TONEFREQUENCY);
    }

    public stopPlay(): void {
        music.ringTone(0);
    }

    constructor() {
        super();
    }
}*/

class ToneMorseSignPlayer {

    public startPlay(morseTone: MorseTones): void {
        if (morseTone === MorseTones.Dot) {
            music.ringTone(TONEFREQUENCYDOT);
        } else {
            music.ringTone(TONEFREQUENCYDASH);
        }
    }

    public stopPlay(): void {
        music.ringTone(0);
    }
}

class MorseSignHandler {
    private _morseSignIndex: number;
    private _morseSigns: MorseSign[];
    private _ledMorseSignPlayer: LedMorseSignPlayer;
    private _toneMorseSignPlayer: ToneMorseSignPlayer;
    private _currentMorseSign: MorseSign;

    constructor(morseSigns: MorseSign[],
        ledMorseSignPlayer: LedMorseSignPlayer,
        toneMorseSignPlayer: ToneMorseSignPlayer
    ) {
        this._morseSignIndex = 0;
        this._morseSigns = morseSigns;
        this._ledMorseSignPlayer = ledMorseSignPlayer;
        this._toneMorseSignPlayer = toneMorseSignPlayer;

        this._currentMorseSign = this._morseSigns[this._morseSignIndex];
    }

    public displayCurrentLetter(): void {
        basic.showString(this._currentMorseSign.Character);
    }

    public setNextMorseSign(): void {
        if (this._morseSignIndex + 1 >= this._morseSigns.length) {
            this._morseSignIndex = 0;
            this._currentMorseSign = this._morseSigns[this._morseSignIndex];
            this.displayCurrentLetter();
        } else {
            this._currentMorseSign = this._morseSigns[++this._morseSignIndex];
            this.displayCurrentLetter();
        }
    }

    public setPreviousMorseSign(): void {
        if (this._morseSignIndex - 1 < 0) {
            this._morseSignIndex = this._morseSigns.length - 1;
            this._currentMorseSign = this._morseSigns[this._morseSignIndex];
            this.displayCurrentLetter();
        } else {
            this._currentMorseSign = this._morseSigns[--this._morseSignIndex];
            this.displayCurrentLetter();
        }
    }

    public playCurrentMorseSign(): void {
        for (let tone of this._currentMorseSign.Tones) {
            this._ledMorseSignPlayer.startPlay(tone);
            this._toneMorseSignPlayer.startPlay(tone);

            if (tone == MorseTones.Dot) {
                basic.pause(DOTDURATION);
            } else {
                basic.pause(DOTDURATION * DASHDURATIONFACTOR);
            }

            this._ledMorseSignPlayer.stopPlay();
            this._toneMorseSignPlayer.stopPlay();
        }
    }

    public init(): void {
        this.displayCurrentLetter();
    }

}

let ledMorseSignPlayer: LedMorseSignPlayer = new LedMorseSignPlayer();
let toneMorseSignPlayer: ToneMorseSignPlayer = new ToneMorseSignPlayer();

let morseSignHandler: MorseSignHandler =
    new MorseSignHandler(MorseSigns, ledMorseSignPlayer, toneMorseSignPlayer);

input.onButtonPressed(Button.A, () => {
    morseSignHandler.setPreviousMorseSign();
});

input.onButtonPressed(Button.B, () => {
    morseSignHandler.setNextMorseSign();
});

input.onButtonPressed(Button.AB, () => {
    morseSignHandler.playCurrentMorseSign();
});

morseSignHandler.init();

