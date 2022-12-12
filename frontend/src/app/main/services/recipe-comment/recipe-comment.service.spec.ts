import { TestBed } from '@angular/core/testing';

import { RecipeCommentService } from './recipe-comment.service';

describe('RecipeCommentService', () => {
  let service: RecipeCommentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeCommentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
