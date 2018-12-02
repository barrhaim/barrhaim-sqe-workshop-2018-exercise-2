export default class Trow {
    constructor(line, type, name, condition, value) {
        this.line = line;
        this.type = type;
        this.name = name;
        this.condition = condition;
        this.value = value;
    }
    toHtml() {
        return `<tr><td>${this.line}</td><td>${this.type}</td><td>${
            this.name
        }</td><td>${this.condition}</td><td>${this.value}</td></tr>`;
    }
}
