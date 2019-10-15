
import { Observable } from "../observable/observable.js";
import { id }         from "../church/church.js";

export { Attribute,
         VALID, VALUE }

const VALUE = "value";
const VALID = "valid";

const Attribute = value => {

    const observables = {}; //Flyweight Pattern

    const hasObs = propname => observables.hasOwnProperty(propname);
    const getObs = (name, initValue = null) =>
        hasObs(name)
            ? observables[name]
            : observables[name] = Observable(initValue); //lazy init: wird erst angelegt, wenns gebraucht wird

    getObs(VALUE, value);

    let   convert           = id ;
    const setConverter      = converter => {
        convert = converter;
        setConvertedValue(value);
    };
    const setConvertedValue = val => getObs(VALUE).setValue(convert(val));

    const setValidator = validate => getObs(VALUE).onChange( val => getObs(VALID).setValue(validate(val)));

    return { getObs, hasObs, setValidator, setConverter, setConvertedValue }
};
