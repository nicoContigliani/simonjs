import { rulesValidations } from '../services/joiValidations.services';



// Función para transformar las validaciones de Joi a un formato más simple para el frontend
export const getValidationRulesForFrontend = () => {
    const result: { [key: string]: any } = {};
    
    for (const [modelName, schema] of Object.entries(rulesValidations)) {
        const extractedRules = schema.describe();
        result[modelName] = transformJoiSchema(extractedRules);
    }
    
    return result;
};

// Función auxiliar que transforma el esquema de Joi a un formato simple
const transformJoiSchema = (schema: any): any => {
    const fields: { [key: string]: any } = {};
    
    if (schema && schema.keys) {
        for (const [field, rules] of Object.entries(schema.keys)) {
            fields[field] = extractRules(rules as any);
        }
    }

    return fields;
};

// Extrae las reglas de validación de cada campo
const extractRules = (rules: any) => {
    const validationRules: { [key: string]: any } = {};

    if (rules.type) {
        validationRules['type'] = rules.type;
    }

    if (rules.rules) {
        for (const rule of rules.rules) {
            if (rule.name) {
                validationRules[rule.name] = rule.args || true;
            }
        }
    }

    if (rules.flags) {
        if (rules.flags.presence === 'required') {
            validationRules['required'] = true;
        }
    }

    if (rules.messages) {
        validationRules['messages'] = rules.messages;
    }

    return validationRules;
};
