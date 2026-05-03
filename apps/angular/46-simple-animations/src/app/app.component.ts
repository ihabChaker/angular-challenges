import { Component } from '@angular/core';

@Component({
  imports: [],
  selector: 'app-root',
  styles: `
    @reference "tailwindcss";

    section {
      @apply flex flex-1 flex-col gap-5;
    }

    .list-item {
      @apply flex flex-row border-b px-5 pb-2;

      span {
        @apply flex-1;
      }
    }
    .enter-animation {
      animation: slide-fade 0.5s;
    }
    @keyframes slide-fade {
      from {
        transform: translateX(-70px);
      }
      to {
        transform: translateX(0);
      }
    }
    .list-items .list-item {
      transition-property: opacity, transform;
      transition-duration: 500ms;
      transition-delay: calc(200ms * var(--index));
      @starting-style {
        opacity: 0;
        transform: translateX(-10px);
      }
    }
  `,
  template: `
    <div class="mx-20 my-40 flex gap-5">
      <section animate.enter="enter-animation">
        <div>
          <h3>2008</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h3>2010</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>

        <div>
          <h4>2012</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae
            mollitia sequi accusantium, distinctio similique laudantium eveniet
            quidem sit placeat possimus tempore dolorum inventore corporis atque
            quae ad, nobis explicabo delectus.
          </p>
        </div>
      </section>

      <section class="list-items">
        <div class="list-item" style="--index: 1">
          <span>Name:</span>
          <span>Samuel</span>
        </div>

        <div class="list-item" style="--index: 2">
          <span>Age:</span>
          <span>28</span>
        </div>

        <div class="list-item" style="--index: 3">
          <span>Birthdate:</span>
          <span>02.11.1995</span>
        </div>

        <div class="list-item" style="--index: 4">
          <span>City:</span>
          <span>Berlin</span>
        </div>

        <div class="list-item" style="--index: 5">
          <span>Language:</span>
          <span>English</span>
        </div>

        <div class="list-item" style="--index: 6">
          <span>Like Pizza:</span>
          <span>Hell yeah</span>
        </div>
      </section>
    </div>
  `,
})
export class AppComponent {}
