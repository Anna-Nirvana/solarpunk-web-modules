const _SolarLogoTicker = class _SolarLogoTicker extends HTMLElement {
  constructor() {
    super();
    this._accent = "hsl(var(--muted) / 0.3)";
    this._borderColor = "hsl(var(--border) / 0.3)";
    this._speed = 90;
    this._direction = "left";
    this._logos = [];
    this.attachShadow({ mode: "open" });
    this.updateStyles();
  }
  connectedCallback() {
    this.parseAttributes();
    this.render();
  }
  disconnectedCallback() {
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue === newValue) return;
    switch (name) {
      case "accent":
        this._accent = newValue;
        break;
      case "speed":
        this._speed = parseFloat(newValue) || 90;
        break;
      case "direction":
        this._direction = newValue === "right" ? "right" : "left";
        break;
      case "data-json":
        try {
          this._logos = JSON.parse(newValue);
        } catch (e) {
          console.error("solar-logo-ticker: Invalid data-json provided", e);
          this._logos = this.getDefaultLogos();
        }
        break;
    }
    this.render();
    this.updateStyles();
  }
  parseAttributes() {
    this._accent = this.getAttribute("accent") || this._accent;
    this._speed = parseFloat(this.getAttribute("speed") || "90") || this._speed;
    this._direction = this.getAttribute("direction") === "right" ? "right" : "left";
    const dataJson = this.getAttribute("data-json");
    if (dataJson) {
      try {
        this._logos = JSON.parse(dataJson);
      } catch (e) {
        console.error("solar-logo-ticker: Invalid data-json provided", e);
        this._logos = this.getDefaultLogos();
      }
    } else {
      this._logos = this.getDefaultLogos();
    }
  }
  getDefaultLogos() {
    return [
      { name: "Arctic Tern Expeditions", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.7 },
      { name: "California Marine Sanctuary Foundation", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.6 },
      { name: "Converge", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Discovery Digital Networks", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Gates Foundation", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Harvard Kennedy School", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.4 },
      { name: "Hawaii Institute of Marine Biology", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "MIT", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "The Mountaineers", logo: "data:image/png;base64,iVBORw0KGgoAAAANBvcHJvdGlvbi5jb20vdjIvZGF0YS9pbWFnZXMvbW91bnRhaW5lZXJz-white.png" },
      // Example using a real URL, assuming it's accessible
      { name: "Northeastern University", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "NOAA", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Orbtl", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Ocean Youth Academy", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Reinvent", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Restore With Resilience", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.2 },
      { name: "Seeker", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Smithsonian", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.6 },
      { name: "The Nature Conservancy", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.6 },
      { name: "The Verge", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Vox", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Watt", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Yale", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=" },
      { name: "Yuba Trails Stewardship", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", scale: 1.7 }
    ];
  }
  updateStyles() {
    const styleTag = this.shadowRoot?.querySelector("style");
    if (styleTag) {
      styleTag.textContent = this.getStyles();
    } else {
      const newStyleTag = document.createElement("style");
      newStyleTag.textContent = this.getStyles();
      this.shadowRoot?.prepend(newStyleTag);
    }
  }
  getStyles() {
    return (
      /*css*/
      `
      :host {
        display: block;
        contain: content;
        font-family: inherit;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }

      .logo-ticker-section {
        padding-top: 3rem;   /* py-12 */
        padding-bottom: 3rem; /* py-12 */
        margin-top: -2rem; /* -mt-8 */
        overflow: hidden;
      }

      .logo-ticker-container {
        max-width: 80rem; /* max-w-7xl */
        margin-left: auto;
        margin-right: auto;
        padding-left: 1.5rem; /* px-6 */
        padding-right: 1.5rem; /* px-6 */
        padding-top: 2rem; /* py-8 */
        padding-bottom: 2rem; /* py-8 */
        border-radius: 1rem; /* rounded-2xl */
        background: linear-gradient(180deg, ${this._accent} 0%, ${this._accent.replace("0.3", "0.1")} 100%);
        border: 1px solid ${this._borderColor};
      }

      .logo-carousel-mask {
        position: relative;
        mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        -webkit-mask-image: linear-gradient(to right, transparent, black 8%, black 92%, transparent);
        overflow: hidden; /* Ensure mask applies correctly */
      }

      .logo-ticker-row {
        display: flex;
        align-items: center;
        gap: 3.5rem; /* gap-14 */
        animation: scroll-left var(--ticker-speed, 90s) linear infinite;
      }

      :host([direction="right"]) .logo-ticker-row {
        animation: scroll-right var(--ticker-speed, 90s) linear infinite;
      }
      
      .logo-item-wrapper {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding-left: 0.5rem; /* px-2 */
        padding-right: 0.5rem; /* px-2 */
        overflow: visible; /* Prevent clipping of glow, if any */
      }

      .logo-item {
        height: 2.5rem; /* h-10 */
        width: auto;
        max-width: 7.5rem; /* max-w-[120px] */
        object-fit: contain;
        opacity: 0.6;
        transition: transform 0.3s ease, filter 0.3s ease;
      }

      @media (min-width: 768px) { /* md breakpoint */
        .logo-ticker-row {
          gap: 5rem; /* md:gap-20 */
        }
        .logo-item {
          height: 3rem; /* md:h-12 */
          max-width: 10rem; /* md:max-w-[160px] */
        }
      }

      @keyframes scroll-left {
        0% { transform: translateX(0%); }
        100% { transform: translateX(-33.333%); }
      }

      @keyframes scroll-right {
        0% { transform: translateX(-33.333%); }
        100% { transform: translateX(0%); }
      }

      @media (prefers-reduced-motion: reduce) {
        .logo-ticker-row {
          animation-play-state: paused !important;
          animation: none !important;
          transform: none !important;
        }
        .logo-carousel-mask {
           mask-image: none !important;
           -webkit-mask-image: none !important;
        }
      }

      /* Dynamically set speed */
      .logo-ticker-row {
        --ticker-speed: ${this._speed}s;
      }
    `
    );
  }
  render() {
    if (this.shadowRoot) {
      this.shadowRoot.innerHTML = "";
      const template = document.createElement("template");
      template.innerHTML = /*html*/
      `
        <style>${this.getStyles()}</style>
        <section class="logo-ticker-section">
          <div class="logo-ticker-container">
            <div class="logo-carousel-mask">
              <div class="logo-ticker-row" style="animation-duration: ${this._speed}s;">
                ${this.createTickerRowContent(this._logos)}
              </div>
            </div>
          </div>
        </section>
      `;
      this.shadowRoot.appendChild(template.content.cloneNode(true));
    }
  }
  createTickerRowContent(items) {
    const duplicatedItems = [...items, ...items, ...items];
    return duplicatedItems.map((item, index) => {
      const glowStyle = item.needsGlow ? `filter: drop-shadow(0 0 6px rgba(255,255,255,0.7)) drop-shadow(0 0 12px rgba(255,255,255,0.3));` : "";
      const scaleStyle = item.scale ? `transform: scale(${item.scale});` : "";
      return `
        <div class="logo-item-wrapper" key="${item.name}-${index}">
          <img
            src="${item.logo}"
            alt="${item.name}"
            class="logo-item"
            style="${scaleStyle} ${glowStyle}"
          />
        </div>
      `;
    }).join("");
  }
};
_SolarLogoTicker.observedAttributes = ["accent", "variant", "speed", "direction", "data-json"];
let SolarLogoTicker = _SolarLogoTicker;
customElements.define("solar-logo-ticker", SolarLogoTicker);
