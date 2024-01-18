import { useState } from 'react';

const CommentForm = ({ recordId, onSave, defaultComment }) => {
	const [comment, setComment] = useState(defaultComment);

	const onSaveComment = () => {
		onSave({ id: recordId, comment: comment.trim() });
	};

    const onClearComment = () => {
        onSave({ id: recordId, comment: null });
    };

	return (
		<div>
			<div className="form-header">
				<h3>Залишити коментар адміністратора</h3>
			</div>
			<form>
				<div className="form-body">
					<table>
						<tbody>
							<tr>
								<td>
									<label>Коментар</label>
								</td>
								<td>
									<textarea
										value={comment}
										onChange={(e) =>
											setComment(e.target.value)
										}
										maxLength={350}
									/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className="formFooter">
					<div className="form-footer-tab left">
						<button
							type="button"
							className="footer-button success"
							onClick={onSaveComment}
						>
							Опублікувати
						</button>
					</div>
					<div className="form-footer-tab right">
						<button
							type="button"
							className="footer-button danger"
							onClick={onClearComment}
                            disabled={!comment}
						>
							Видалити
						</button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default CommentForm;
