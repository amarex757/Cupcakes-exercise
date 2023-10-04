const base_url = "http://localhost:5000/api"

// generate html using cupcake data
function generateCupcakeHTML(cupcake) {
    return `
    <div data-cupcake-id=${cupcake.id}>
        <li>
            ${cupcake.flavor} / ${cupcake.size} / ${cupcake.rating}
            <button clas='delete-button'>X</button>
        </li>
        <img class='Cupcake-img'
                src='${cupcake.image}'
                alt='(no image provided)'>
    </div>
    `;
}

// initial cupcakes
async function showInitialCupcakes() {
    const response = await axios.get(`${base_url}/cupcakes`);
    for (let cupcakeData of response.data.cupcakes) {
        let newCupcake = $(generateCupcakeHTML(cupcakeData));
        $('#cupcakes-list').append(newCupcake);
    }
}

// handle cupcake add form
$('#new-cupcake-form').on('submit', async function (evt) {
    evt.preventDefault();
    let flavor = $('#form-flavor').val();
    let rating = $('#form-rating').val();
    let size = $('#form-size').val();
    let image = $('#form-image').val();

    const newCupcakeResponse = await axios.post(`${base_url}/cupcakes`, {flavor, rating, size, image });
    let newCupcake = $(generateCupcakeHTML(newCupcakeResponse.data.cupcake));
    $('#cupcakes-list').append(newCupcake);
    $('#new-cupcake-form').trigger('reset');
});

// handle deleting cupcake
$('#cupcakes-list').on('click', '.delete-button', async function (evt) {
    evt.preventDefault();
    let $cupcake = $(evt.target).closest('div');
    let cupcakeId = $cupcake.attr('data-cupcake-id');

    await axios.delete(`${base_url}/cupcakes/${cupcakeId}`);
    $cupcake.remove();
});

// display cupcakes on homepage
$(showInitialCupcakes);

