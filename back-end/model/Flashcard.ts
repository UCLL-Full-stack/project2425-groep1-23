import { Assignment } from './Assignment';
import { Progress } from './Progress';
import { Category } from './Category';

export class Flashcard {
  id: number;
  question: string;
  answer: string;
  categoryId?: number;
  category?: Category;
  assignments: Assignment[];
  progresses: Progress[];
  createdAt: Date;
  updatedAt: Date;

  constructor(
    id: number,
    question: string,
    answer: string,
    createdAt: Date,
    updatedAt: Date,
    assignments: Assignment[] = [],
    progresses: Progress[] = [],
    categoryId?: number,
    category?: Category
  ) {
    this.id = id;
    this.question = question;
    this.answer = answer;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.assignments = assignments;
    this.progresses = progresses;
    if (categoryId !== undefined) {
      this.categoryId = categoryId;
    }
    if (category) {
      this.category = category;
    }
  }

  updateAnswer(newAnswer: string): void {
    this.answer = newAnswer;
    this.updatedAt = new Date();
  }

  assignToUser(assignment: Assignment): void {
    this.assignments.push(assignment);
    this.updatedAt = new Date();
  }
}
