module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback(
                {
                    professor: [
                        {id: 1, name: "Juan", course_id: 1},
                        {id: 2, name: "Gabriela", course_id: 2},
                        {id: 3, name: "Daniel", course_id: 3}
                    ],
                    student: [
                        {id: 1, name: "Juana", grade: "I"},
                        {id: 2, name: "Gabriel", grade: "I"},
                        {id: 3, name: "Daniela", grade: "I"}
                    ],
                    course: [
                        {id: 1, name: "Mathematics I"},
                        {id: 2, name: "Physics"},
                        {id: 3, name: "Biology"}
                    ],
                    task: [
                        {id: 1, kind: "Exercise", description: "Do first exercise on the textbook", course_id: 1},
                        {id: 1, kind: "Investigate", description: "Find the gravity in another planet", course_id: 1},
                        {id: 1, kind: "Lecture", description: "Read about the lymbic system", course_id: 1}
                    ]
                }
            );
        }
    };
};