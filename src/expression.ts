export interface Expression {
    logicalOperator: "and"| "or" | '';
    fact: String;
    operator: String;
    typeOfValue: "fact" | "value" | "formula"| '';
    value: String;
    sequenceNo: number;
}