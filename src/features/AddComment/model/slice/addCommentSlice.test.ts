import { AddCommentSchema } from '../types/addComment.types';
import { DeepPartial } from '#/shared/types/DeepPartial.types';
import { addCommentActions, addCommentReducer } from '../slice/addCommentSlice';

describe('addCommentSlice.test', () => {
    it('should set comment  text', () => {
        const state: DeepPartial<AddCommentSchema> = {
            text: '',
        };

        const text = 'test';

        expect(
            addCommentReducer(
                state as AddCommentSchema,
                addCommentActions.setText(text),
            ),
        ).toEqual({
            text,
        });
    });
});
