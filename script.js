const chapterButtons = [...document.querySelectorAll('[data-chapter]')];
const chapterTitle = document.getElementById('chapter-title');
const chapterPreview = document.querySelector('.chapter-preview img');
const chapterDescription = document.querySelector('.chapter-preview span');
const readChapter = document.querySelector('#chapitres .card-action');

function selectChapter(number) {
  const chapter = document.getElementById(`chapitre-${number}`);
  if (!chapter) return;

  const images = chapter.querySelectorAll('.panels img');
  const firstImage = images[0];

  chapterTitle.textContent = `CHAPITRE ${number}`;
  chapterPreview.src = firstImage.src;
  chapterPreview.width = firstImage.width;
  chapterPreview.height = firstImage.height;
  chapterPreview.alt = firstImage.alt;
  chapterDescription.textContent = `${images.length} illustrations`;
  readChapter.href = `#chapitre-${number}`;

  for (const button of chapterButtons) {
    if (button.dataset.chapter === number) {
      button.setAttribute('aria-current', 'true');
    } else {
      button.removeAttribute('aria-current');
    }
  }
}

for (const button of chapterButtons) {
  button.addEventListener('click', () => selectChapter(button.dataset.chapter));
}

function syncChapter() {
  const button = chapterButtons.find(button => location.hash === `#chapitre-${button.dataset.chapter}`);
  if (button) selectChapter(button.dataset.chapter);
}

window.addEventListener('hashchange', () => {
  syncChapter();
  window.scrollTo({ top: 0, behavior: 'instant' });
});

syncChapter();
