document.addEventListener("DOMContentLoaded", () => {

  console.log("JS ready...");

  /**
 * -----------------------------------------------------------------------
 *                                  Slider
 * -----------------------------------------------------------------------
 */

  const tab_chair = ["black", "red", "orange"];
  const slider = document.querySelector('.slider');
  const prev = slider.querySelector('.prev');
  const next = slider.querySelector('.next');
  const image = slider.querySelector('.image');

  const set_image = (table, index) => {
    image.style.backgroundImage = 'url("./dist/images/' + table[index] + '.png")';
    image.dataset.idx = index;
  }

  const slider_events = () => {
    prev.addEventListener('click', function () {
      let index = image.dataset.idx;
      if (Number(index) === 0) {
        index = tab_chair.length;
      }
      index--;
      set_image(tab_chair, index);
    })
    next.addEventListener('click', function () {
      let index = image.dataset.idx;
      if (Number(index) === tab_chair.length - 1) {
        index = -1;
      }
      index++;
      set_image(tab_chair, index);
    })
  }

  // Slider events initialisation

  set_image(tab_chair, 0);
  slider_events();

  /**
 * -----------------------------------------------------------------------
 *                           Payment calculator
 * -----------------------------------------------------------------------
 */

  const form = document.querySelector('.calculator');

  const choice_part = form.querySelector('.choice_part');
  const list_labels = choice_part.querySelectorAll('.list_label');
  const list_arrows = choice_part.querySelectorAll('.list_arrow');
  const list_panels = choice_part.querySelectorAll('.list_panel');
  const list_li = choice_part.querySelectorAll('li');
  const transport = choice_part.querySelector('#transport');
  const transport_label = choice_part.querySelector('#checkbox_label:after');

  const summary_part = form.querySelector('.summary_part');
  const summary_panel = summary_part.querySelector('.summary_panel');
  const tab_value = summary_panel.querySelectorAll('.value');
  const sum = summary_panel.querySelector('.sum');

  const list_panels_hide = () => {
    for (let i = 0; i < list_arrows.length; i++) {
      list_arrows[i].parentElement.children[2].classList.add('hidden');
    }
  }

  const list_panels_toggle_events = () => {
    for (let i = 0; i < list_arrows.length; i++) {

      list_arrows[i].addEventListener('click', function (e) {
        this.parentElement.children[2].classList.remove('hidden');
      })

      list_panels[i].addEventListener('mouseleave', function (e) {
        this.classList.add('hidden');
      });
    }
  }

  const summary_event = () => {
    let total = 0;
    for (let i = 0; i < tab_value.length; i++) {
      total += Number(tab_value[i].innerText);
    }
    sum.innerText = total;
  }

  const select_feature_events = () => {
    for (let i = 0; i < list_li.length; i++) {
      list_li[i].addEventListener('click', function (e) {
        this.parentElement.classList.add('hidden');
        let name = summary_panel.querySelector('.' + this.parentElement.id + '.name');
        let value = summary_panel.querySelector('.' + this.parentElement.id + '.value');
        let list_label = this.parentElement.parentElement.firstElementChild;

        name.innerText = this.innerText;
        value.innerText = this.dataset.price;
        list_label.innerText = this.innerText;
        list_label.style.color = "#575757";
        summary_event();
      })
    }
  }

  const select_transport_event = () => {
    transport.addEventListener("change", function (e) {
      let name = summary_panel.querySelector('.' + this.id + '.name');
      let value = summary_panel.querySelector('.' + this.id + '.value');

      if (this.checked) {
        name.innerText = this.id;
        value.innerText = this.dataset.price;
      } else {
        name.innerText = "";
        value.innerText = "";
      }
      summary_event();
    })
  }

  // Calculator events initialisation

  list_panels_hide();
  list_panels_toggle_events();
  summary_event();
  select_feature_events();
  select_transport_event();

})
