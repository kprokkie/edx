export class AdvancedSearchModel {
    // Notice the question marks after each variable. 
    // These indicate that these variables are optional and can be omitted by the constructor.
    constructor(
        public q: string,
        public language?: string,
        public user?: string,
        public size?: number,
        public stars?: number,
        public topic?: string
    ) {  }
}
