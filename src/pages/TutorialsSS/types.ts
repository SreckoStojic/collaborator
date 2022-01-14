export interface ITutorial {
    id: number;
    title: string;
    author: string;
}

export interface IStateTutorial {
    tutorials: ITutorial[];
}
