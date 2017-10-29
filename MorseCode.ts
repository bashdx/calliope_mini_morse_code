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
const DOTDURATION: number = 250;

//Die Frequenz in Hertz (Hz) für den Punkt
//The frequency in Hertz (Hz) for the dot
const TONEFREQUENCYDOT: number = 880;

//Die Frequenz in Hertz (Hz) für den Strich
//The frequency in Hertz (Hz) for the dash
const TONEFREQUENCYDASH: number = 440;

//Es gibt zwei Zeichen - lang (Strich), kurz (Punkt)
//There are two signs available - long (dash), short (dot)
enum MorseTones {
    Dot,
    Dash
};

//Die Klasse MorseCode bildet ein einzelnes Morsezeichen ab
//The class MorseCode handles a single morse sign
class MorseCode {

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

    //Getter für die einzelnen Töne
    //Getter for the tones
    get Tones(): MorseTones[] {
        return this._morseTones;
    }

    //Getter für das zugehörige Zeichen
    //Getter for the corresponding character
    get Character(): string {
        return this._morseCharacter;
    }
}
;

//Die für die Anwendung verfügbaren Morsezeichen
//The morse codes available to the application
const MorseCodes: MorseCode[] =
    [
        new MorseCode([MorseTones.Dot, MorseTones.Dash], 'A'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dot, MorseTones.Dot], 'B'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dash, MorseTones.Dot], 'C'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dot], 'D'),
        new MorseCode([MorseTones.Dot], 'E'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot, MorseTones.Dash, MorseTones.Dot], 'F'),
        new MorseCode([MorseTones.Dash, MorseTones.Dash, MorseTones.Dot], 'G'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot, MorseTones.Dot, MorseTones.Dot], 'H'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot], 'I'),
        new MorseCode([MorseTones.Dot, MorseTones.Dash, MorseTones.Dash, MorseTones.Dash], 'J'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dash], 'K'),
        new MorseCode([MorseTones.Dot, MorseTones.Dash, MorseTones.Dot, MorseTones.Dot], 'L'),
        new MorseCode([MorseTones.Dash, MorseTones.Dash], 'M'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot], 'N'),
        new MorseCode([MorseTones.Dash, MorseTones.Dash, MorseTones.Dash], 'O'),
        new MorseCode([MorseTones.Dot, MorseTones.Dash, MorseTones.Dash, MorseTones.Dot], 'P'),
        new MorseCode([MorseTones.Dash, MorseTones.Dash, MorseTones.Dot, MorseTones.Dash], 'Q'),
        new MorseCode([MorseTones.Dot, MorseTones.Dash, MorseTones.Dot], 'R'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot, MorseTones.Dot], 'S'),
        new MorseCode([MorseTones.Dash], 'T'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot, MorseTones.Dash], 'U'),
        new MorseCode([MorseTones.Dot, MorseTones.Dot, MorseTones.Dot, MorseTones.Dash], 'V'),
        new MorseCode([MorseTones.Dot, MorseTones.Dash, MorseTones.Dash], 'W'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dot, MorseTones.Dash], 'X'),
        new MorseCode([MorseTones.Dash, MorseTones.Dot, MorseTones.Dash, MorseTones.Dash], 'Y'),
        new MorseCode([MorseTones.Dash, MorseTones.Dash, MorseTones.Dot, MorseTones.Dot], 'Z')
    ];
/*
Der PXT-Editor auf der Website ist aktuell (29.10.2017) noch nicht in der Lage, mit abstrakten Klassen zu arbeiten, bzw. konnte ich die abgeleiteten Klassen nicht benutzen.
As of 10/29/2017 the PXT editor on the site was not capable of handling abstract classes and inheritance. I could not instantiate objects of derived classes.
*/

/*abstract class MorseCodePlayer {

    public abstract startPlay(): void;

    public abstract stopPlay(): void;

    constructor() {

    }
}*/

/*class LedMorseCodePlayer extends MorseCodePlayer {

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

//Ein Morsezeichen mit der RGB-LED anzeigen
//Play a morse code using the RGB-LED
class LedMorseCodePlayer {

    //Spiele ein einzelnes Zeichen ab
    //Play a single tone
    //Parameter morseTone (Typ MorseTone) - das aktuelle Zeichen (Punkt oder Strich) aus der Zeichnfolge
    //                                    - the current sign (dot or dash) of the morse code
    public startPlay(morseTone: MorseTones): void {
        if (morseTone == MorseTones.Dot) {
            //Zeichen ist ein Punkt - sign is a dot
            basic.setLedColor(LEDCOLORDOT);
        } else {
            //Zeichen ist ein Strich - sign is a dash
            basic.setLedColor(LEDCOLORDASH);
        }
    }

    //Beende das Spielen
    //Stop playing tone
    public stopPlay(): void {
        basic.setLedColor(0);
    }
}

/*
class ToneMorseCodePlayer extends MorseCodePlayer {

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

//Ein Morsezeichen als Ton abspielen
//Play a morse sign as an audible tone
class ToneMorseCodePlayer {

    //Spiele ein einzelnes Zeichen ab
    //Play a single tone
    //Parameter morseTone (Typ MorseTone) - das aktuelle Zeichen (Punkt oder Strich) aus der Zeichnfolge
    //                                    - the current sign (dot or dash) of the morse code
    public startPlay(morseTone: MorseTones): void {
        if (morseTone === MorseTones.Dot) {
            //Zeichen ist ein Punkt - sign is a dot
            music.ringTone(TONEFREQUENCYDOT);
        } else {
            //Zeichen ist ein Strich - sign is a dash
            music.ringTone(TONEFREQUENCYDASH);
        }
    }

    //Beende das Spielen
    //Stop playing tone
    public stopPlay(): void {
        music.ringTone(0);
    }
}

//Beinhaltet die Hauptlogik der Anwendung
//Contains the main logic of the application
class MorseCodeHandler {

    //Der Index des ausgewählten Morsezeichens - s. Definition "MorseSigns" weiter oben
    //The index of the currently selected morse code - see definition "MorseSigns" further up
    private _morseCodeIndex: number;

    //Die verfügbaren Morsezeichen
    //The available morse code signs 
    private _morseCodes: MorseCode[];

    //Der Handler zum Abspielen des Morsezeichens mittels RGB-LED
    //The handler to play the morse code using RGB-LED
    private _ledMorseCodePlayer: LedMorseCodePlayer;

    //Der Handler zum Abspielen des Morsezeichens mittels Lautsprecher
    //The handler to play the morse code using loudspeaker
    private _toneMorseCodePlayer: ToneMorseCodePlayer;

    //Verweis auf das aktuelle Morsezeichen
    //Reference to the current morse code
    private _currentMorseCode: MorseCode;

    //Konstruktor - erstelle das Objekt
    //Constructor - create the object instance

    //Parameter morseCodes (Typ Array von MorseCode) - die zur Verfügung stehenden Morsezeichen
    //                     (Type array of MorseCode) - the available morse code signs
    //Parameter morseCodes (Typ LedMorseCodePlayer) - der Handler zum Abspielen mittels RGB-LED
    //                     (Type LedMorseCodePlayer) - the handler to play the tone using RGB-LED
    //Parameter morseCodes (Typ ToneMorseCodePlayer) - der Handler zum Abspielen mittels Lautsprecher
    //                     (Type ToneMorseCodePlayer) - the handler to play the tone using loudspeaker
    constructor(morseCodes: MorseCode[],
        ledMorseCodePlayer: LedMorseCodePlayer,
        toneMorseCodePlayer: ToneMorseCodePlayer
    ) {
        //Anfangswerte des Objekts festlegen
        //Set initial values for object instance
        this._morseCodeIndex = 0;
        this._morseCodes = morseCodes;
        this._ledMorseCodePlayer = ledMorseCodePlayer;
        this._toneMorseCodePlayer = toneMorseCodePlayer;

        //Setze den Verweis auf das erste Element der verfügbaren Morsezeichen
        //Set reference to the first element of the available morse code signs
        this._currentMorseCode = this._morseCodes[this._morseCodeIndex];
    }

    //Zeige den Buchstaben des aktuellen Morsezeichens auf der LED-Matrix an
    //Display the letter of the current morse code sign on the LED matrix
    public displayCurrentLetter(): void {
        basic.showString(this._currentMorseCode.Character);
    }

    //Setze den Verweis auf nächste verfügbare Morsezeichen oder beginne von vorne
    //Set reference to the next available morse code sign or start over
    public setNextMorseCode(): void {
        if (this._morseCodeIndex + 1 >= this._morseCodes.length) {
            //Von vorne beginnen - start over
            this._morseCodeIndex = 0;
            this._currentMorseCode = this._morseCodes[this._morseCodeIndex];
            this.displayCurrentLetter();
        } else {
            //Wähle das nächste Zeichen aus - select next morse code sign
            this._currentMorseCode = this._morseCodes[++this._morseCodeIndex];
            this.displayCurrentLetter();
        }
    }

    //Setze den Verweis auf vorherige verfügbare Morsezeichen oder beginne von vorne
    //Set reference to the previous available morse code sign or start over
    public setPreviousMorseCode(): void {
        if (this._morseCodeIndex - 1 < 0) {
            //Von vorne beginnen - start over
            this._morseCodeIndex = this._morseCodes.length - 1;
            this._currentMorseCode = this._morseCodes[this._morseCodeIndex];
            this.displayCurrentLetter();
        } else {
            //Wähle das vorherige Zeichen aus - select previous morse code sign
            this._currentMorseCode = this._morseCodes[--this._morseCodeIndex];
            this.displayCurrentLetter();
        }
    }

    //Spiele das aktuelle Morsezeichen ab
    //Play current morse code sign
    public playCurrentMorseCode(): void {
        //Iteriere über die einzelnen Töne
        //Iterate over the tones
        for (let tone of this._currentMorseCode.Tones) {
            this._ledMorseCodePlayer.startPlay(tone);
            this._toneMorseCodePlayer.startPlay(tone);

            //Pausiere die Ausführung, solange wie die Ausführung dauert (Punkt oder Strich)
            //Pause execution as long as the duration of the tone (dot or dash)
            if (tone == MorseTones.Dot) {
                basic.pause(DOTDURATION);
            } else {
                basic.pause(DOTDURATION * DASHDURATIONFACTOR);
            }

            //Setze RGB-LED und Lautsprecher zurück
            //Reset RGB-LED and loudspeaker
            this._ledMorseCodePlayer.stopPlay();
            this._toneMorseCodePlayer.stopPlay();

            //Pausiere - laut Definition ist zwischen jedem Zeichen eine Pause von einem Punkt einzuhalten
            //Pause - according to definition there is a break of the length of one dot between tones required
            basic.pause(DOTDURATION);
        }
    }

    //Initialisiere den Handler
    //Initialize handler
    public init(): void {
        this.displayCurrentLetter();
    }

}

//Erstelle Objekt-Instanzen
//Create object instances
let ledMorseCodePlayer: LedMorseCodePlayer = new LedMorseCodePlayer();
let toneMorseCodePlayer: ToneMorseCodePlayer = new ToneMorseCodePlayer();

let morseCodeHandler: MorseCodeHandler =
    new MorseCodeHandler(MorseCodes, ledMorseCodePlayer, toneMorseCodePlayer);

//Setze die Button-Handler
//Set button handlers
input.onButtonPressed(Button.A, () => {
    morseCodeHandler.setPreviousMorseCode();
});

input.onButtonPressed(Button.B, () => {
    morseCodeHandler.setNextMorseCode();
});

input.onButtonPressed(Button.AB, () => {
    morseCodeHandler.playCurrentMorseCode();
});

//Initialisiere die Anwendung
//Initialize application
morseCodeHandler.init();

