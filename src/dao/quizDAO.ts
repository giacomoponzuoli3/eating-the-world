import getDatabase from './connectionDB';

const getQuestionsByRestaurantId = async (id_restaurant: number) => {
    try {
        const db = await getDatabase();

        const sqlFindQuestions = `
            SELECT id_question 
            FROM restaurants_questions 
            WHERE id_restaurant = ?;
        `;
        const questionIds = await db.getAllAsync(sqlFindQuestions, [id_restaurant]);

        const questions = await Promise.all(
            questionIds.map(async (q: { id_question: number }) => {
                const sqlQuestionDetails = `
                    SELECT question, explanation, answer1, answer2, correct_answer 
                    FROM questions 
                    WHERE id = ?;
                `;
                const questionDetails = await db.getAllAsync(sqlQuestionDetails, [q.id_question]);


                const { question, explanation, answer2, answer1, correct_answer } = questionDetails[0];

                const answersQuery = `
                    SELECT id, answer 
                    FROM answers 
                    WHERE id IN (?, ?, ?);
                `;
                const answers = await db.getAllAsync(answersQuery, [answer2, answer1, correct_answer]);

                const formattedAnswers = answers.reduce((acc: Record<number, string>, curr: { id: number, answer: string }) => {
                    acc[curr.id] = curr.answer;
                    return acc;
                }, {});

                return {
                    question,
                    explanation,
                    answers: [
                        formattedAnswers[answer2],
                        formattedAnswers[answer1],
                        formattedAnswers[correct_answer],
                    ],
                    correctAnswer: formattedAnswers[correct_answer],
                };
            })
        );
        return questions;

    } catch (error) {
        console.error("Error in getQuestionsByRestaurantId:", error);
        return error;
    }
};

export {
    getQuestionsByRestaurantId,
};
