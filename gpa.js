var STORAGE_KEY = "gpa-calculator-courses";

function loadCourses() {
  var raw = localStorage.getItem(STORAGE_KEY);
  if (raw == null) {
    return [];
  }
  return JSON.parse(raw);
}

function saveCourses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(courses));
}

var courses = loadCourses();

function gradeLetter(g) {
  if (g >= 4.0) return "A";
  if (g >= 3.7) return "A-";
  if (g >= 3.3) return "B+";
  if (g >= 3.0) return "B";
  if (g >= 2.7) return "B-";
  if (g >= 2.3) return "C+";
  if (g >= 2.0) return "C";
  if (g >= 1.7) return "C-";
  if (g >= 1.3) return "D+";
  if (g >= 1.0) return "D";
  return "F";
}

function getStanding(gpa) {
  if (gpa >= 3.85) return "Summa";
  if (gpa >= 3.65) return "Magna";
  if (gpa >= 3.5) return "Cum Laude";
  if (gpa >= 3.0) return "Good";
  if (gpa >= 2.0) return "Satisfactory";
  return "Probation";
}

function round2(n) {
  return Math.round(n * 100) / 100;
}

function addCourse() {
  var nameStr = document.getElementById("course-name").value;
  var creditsStr = document.getElementById("credits").value;
  var gradeStr = document.getElementById("grade").value;

  if (nameStr == "" || creditsStr == "" || gradeStr == "") {
    alert("Please fill in all fields.");
    return;
  }

  var credits = parseFloat(creditsStr);
  var grade = parseFloat(gradeStr);

  if (!(credits > 0)) {
    alert("Credits must be a positive number.");
    return;
  }

  courses.push({ name: nameStr, credits: credits, grade: grade });

  document.getElementById("course-name").value = "";
  document.getElementById("credits").value = "";
  document.getElementById("grade").value = "";

  render();
}

function deleteCourse(i) {
  courses.splice(i, 1);
  render();
}

function render() {
  var listHTML = "";

  if (courses.length == 0) {
    listHTML = '<div class="empty">No courses yet add one above.</div>';
  } else {
    for (var i = 0; i < courses.length; i++) {
      var c = courses[i];
      listHTML = listHTML +
        '<div class="course-row">' +
          '<span class="course-name">' + c.name + '</span>' +
          '<span>' + c.credits + ' cr</span>' +
          '<span>' + gradeLetter(c.grade) + '</span>' +
          '<button class="delete" onclick="deleteCourse(' + i + ');">x</button>' +
        '</div>';
    }
  }
  document.getElementById("course-list").innerHTML = listHTML;

  var totalCredits = 0;
  var qualityPoints = 0;
  for (var j = 0; j < courses.length; j++) {
    totalCredits = totalCredits + courses[j].credits;
    qualityPoints = qualityPoints + courses[j].credits * courses[j].grade;
  }

  var gpa = 0;
  if (totalCredits > 0) {
    gpa = qualityPoints / totalCredits;
  }

  document.getElementById("gpa").innerHTML = round2(gpa);
  document.getElementById("total-credits").innerHTML = round2(totalCredits);
  document.getElementById("quality-points").innerHTML = round2(qualityPoints);

  if (courses.length > 0) {
    document.getElementById("standing").innerHTML = getStanding(gpa);
  } else {
    document.getElementById("standing").innerHTML = "--";
  }

  saveCourses();
}

render();