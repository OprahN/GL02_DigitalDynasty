// CourseFunctions.js

const CourseParser = require("./Parser");

// Fonction pour obtenir les salles associées à un cours (spec 1)

async function getSalles(cours) {
  // Créer une instance de CourseParser
  const courseParser = new CourseParser();

  // Obtenir les cours parsés à partir des fichiers dans le répertoire spécifié
  const parsedCourses = await courseParser.getParsedCourses();

  // Rechercher le cours spécifié
  const upperCaseTarget = cours && cours.toUpperCase(); 

  let selectedCourse = null;
  for (const course of parsedCourses) {
    if (course.code && upperCaseTarget && course.code.toUpperCase() === upperCaseTarget) {
      selectedCourse = course;
      break;
    }
  }
  return selectedCourse.sessions  
}
// Fonction pour récupérer les capacités maximales d'une salle ( spec 2)
async function getCapacite(salle, logger) {
  const courseParser = new CourseParser();
  const parsedCourses = await courseParser.getParsedCourses();

  // Création d'un objet pour le mappage salle-capacité
  const salleCapaciteMap = {};
  parsedCourses.forEach(course => {
    course.sessions.forEach(session => {
      salleCapaciteMap[session.room.toLowerCase()] = session.capacity;
    });
  });

  // Recherche directe de la capacité
  return salleCapaciteMap[salle.toLowerCase()] || null;
}

module.exports = {
  getSalles,
  getCapacite,
};