import { algoliasearch } from 'algoliasearch';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

const $searchBox = document.querySelector('#searchBox input[type=search]');
const $hits = document.querySelector('#hits');

function renderHits(query) {
  client
    .search({
      requests: [
        {
          indexName: 'instant_search',
          query: query,
        },
      ],
    })
    .then(({ results }) => {
      const hits = results[0].hits || [];
      // Please sanitize user-provided data when using `innerHTML` to avoid XSS
      $hits.innerHTML = `
      <ol class="ais-hits">
        ${hits
          .map(
            (hit) =>
              `<li class="ais-hits--item">
                <article>
                  <div>
                    <h1>${hit._highlightResult.name.value}</h1>
                    <p>${hit._highlightResult.description.value}</p>
                  </div>
                </article>
              </li>`
          )
          .join('')}
      </ol>`;
    });
}

$searchBox.addEventListener('input', (event) => {
  const query = event.target.value;

  renderHits(query);
});

renderHits('');

