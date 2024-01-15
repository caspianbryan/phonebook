import React from 'react'

const Course = ({ courses }) => {
    const totalCourses = courses[0].parts.reduce((sum, part) => sum + part.exercises, 0)
    const second = courses[1].parts.reduce((sum, part) => sum + part.exercises, 0)
    
  return (
    <>
        <div>
            <div>
                <p>
                    {courses[0].parts.map((sub) => (
                        <li key={sub.id}>
                            {sub.name} {sub.exercises}
                        </li>
                    ))}
                </p>
            </div>
            <p>
                <strong>Total of {totalCourses} exercises</strong>
            </p>
        </div>
        <div>
            <h3>{courses[1].name}</h3>
            <p>
            {courses[1].parts.map((sub) => (
                        <li key={sub.id}>
                            {sub.name} {sub.exercises}
                        </li>
                    ))}
            </p>
            <p>
                <strong>Total of {second} exercises</strong>
            </p>
        </div>
    </>
  )
}

export default Course