import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormControl, FormGroup, Validator, Validators } from "@angular/forms";
import { ISession } from "../../common";

@Component({
    selector: "create-session",
    templateUrl: "./create.session.component.html",
    styleUrls: ['./create.session.component.css']
})
export class CreateSessionComponent implements OnInit {
    @Output() saveNewSession = new EventEmitter();
    @Output() cancelNewSession = new EventEmitter();

    newSessionForm: FormGroup;
    name: FormControl;
    presenter: FormControl;
    duration: FormControl;
    level: FormControl;
    abstract: FormControl;

    ngOnInit() {
        this.name = new FormControl('', Validators.required);
        this.presenter = new FormControl('', Validators.required);
        this.duration = new FormControl('', Validators.required);
        this.level = new FormControl('', Validators.required);
        this.abstract = new FormControl('', [Validators.required, Validators.maxLength(100), this.restrictedWords(['foo', 'poo'])]);

        this.newSessionForm = new FormGroup({
            name: this.name,
            presenter: this.presenter,
            duration: this.duration,
            level: this.level,
            abstract: this.abstract
        })
    }

    saveSession(formData) {
        let newSession:ISession = {
            id: undefined,
            name: formData.name,
            presenter: formData.presenter,
            duration: +formData.duration,
            level: formData.level,
            abstract: formData.abstract,
            voters: []
        }
        this.saveNewSession.emit(newSession);
    }

    cancel() {
        this.cancelNewSession.emit();
    }

    private restrictedWords(words:string[]) {
        return (control:FormControl):{[key:string]:any} => {
            if (!words || words.length == 0) return null;

            let invalidWords = words
                .map(w => control.value.includes(w)?w:null)
                .filter(f => f!=null)

            if (invalidWords && invalidWords.length > 0) {
                return {'restrictedWords':invalidWords.join(', ')};
            }
            return null;
        }
    }
}