/**
 * Precisian Scientific Instrument Suppliers — Core Site Script
 * Handles responsive popover navigation, product filtering, native <dialog> lightbox,
 * Web3Forms submission with progressive enhancement, and footer copyright year.
 */
(() => {
  "use strict";

  // 1. Conditional Popover API polyfill (only when native support is missing)
  if (!Object.hasOwn(HTMLElement.prototype, "popover")) {
    import("https://unpkg.com/@oddbird/popover-polyfill@latest/dist/popover.min.js").catch(() => {
      // Graceful degradation if CDN is unreachable
    });
  }

  // 2. Dynamic Copyright Year
  const yearEl = document.getElementById("copyright-year");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  // 3. Adaptive Site Navigation (wide inline vs narrow popover)
  const header = document.querySelector(".site-header");
  const headerInner = header?.querySelector(".header-inner");
  const siteMenu = document.getElementById("site-menu");
  const dropdownItem = header?.querySelector(".nav-dropdown");
  const dropdownTrigger = dropdownItem?.querySelector(".dropdown-trigger");
  const submenu = dropdownItem?.querySelector(".dropdown-list");

  if (header && headerInner && siteMenu) {
    let lastHeaderWidth = 0;
    let isWide = false;
    let hoverPinned = false;
    let hoverPreviewActive = false;
    let lastInputKeyboard = false;

    document.addEventListener("keydown", (e) => {
      if (e.key === "Tab" || e.key === "Enter" || e.key === " " || e.key.startsWith("Arrow") || e.key === "Escape") {
        lastInputKeyboard = true;
      }
    }, true);
    document.addEventListener("pointerdown", () => {
      lastInputKeyboard = false;
    }, true);

    const syncSubmenuMode = (wide) => {
      if (!submenu || !dropdownTrigger) return;
      if (wide) {
        submenu.setAttribute("popover", "auto");
        submenu.hidden = false;
        dropdownTrigger.setAttribute("popovertarget", submenu.id);
      } else {
        submenu.removeAttribute("popover");
        submenu.hidden = true;
        dropdownTrigger.removeAttribute("popovertarget");
      }
      dropdownTrigger.setAttribute("aria-expanded", "false");
    };

    const positionSubmenuFallback = () => {
      if (!submenu || !dropdownTrigger || !isWide) return;
      if (CSS.supports("position-area", "block-end")) return;

      const trigRect = dropdownTrigger.getBoundingClientRect();
      const menuRect = submenu.getBoundingClientRect();
      let top = trigRect.bottom + 8;
      if (top + menuRect.height > window.innerHeight - 12 && trigRect.top - menuRect.height - 8 > 12) {
        top = trigRect.top - menuRect.height - 8;
      }
      const left = Math.max(8, Math.min(trigRect.left, window.innerWidth - menuRect.width - 8));
      submenu.style.top = `${top}px`;
      submenu.style.left = `${left}px`;
    };

    const measureLayout = () => {
      const currentWidth = headerInner.clientWidth;
      if (!isWide && currentWidth <= lastHeaderWidth && lastHeaderWidth > 0) {
        return;
      }

      const menuWasOpen = !isWide && siteMenu.matches(":popover-open, .\\:popover-open");
      if (menuWasOpen && typeof siteMenu.hidePopover === "function") {
        try {
          siteMenu.hidePopover();
        } catch {
          // Ignore if already closed
        }
      }

      header.classList.add("is-measuring", "is-wide");
      siteMenu.removeAttribute("popover");
      if (submenu) {
        submenu.setAttribute("popover", "auto");
        submenu.hidden = false;
      }

      const fits = headerInner.scrollWidth <= headerInner.clientWidth + 1;

      isWide = fits;
      lastHeaderWidth = currentWidth;

      if (fits) {
        header.classList.add("is-wide");
        siteMenu.removeAttribute("popover");
      } else {
        header.classList.remove("is-wide");
        siteMenu.setAttribute("popover", "auto");
        if (menuWasOpen && typeof siteMenu.showPopover === "function") {
          try {
            siteMenu.showPopover();
          } catch {
            // Ignore if unavailable
          }
        }
      }

      syncSubmenuMode(fits);

      requestAnimationFrame(() => {
        header.classList.remove("is-measuring");
      });
    };

    // Initial measurement before paint, plus re-check after web fonts finish swapping
    measureLayout();
    document.fonts?.ready?.then(() => measureLayout());

    if ("ResizeObserver" in window) {
      const ro = new ResizeObserver(() => measureLayout());
      ro.observe(header);
      ro.observe(siteMenu);
    } else {
      window.addEventListener("resize", measureLayout);
    }

    // Submenu interactions
    if (dropdownItem && dropdownTrigger && submenu) {
      dropdownTrigger.addEventListener("click", (e) => {
        if (!isWide) {
          const isHidden = submenu.hidden;
          submenu.hidden = !isHidden;
          dropdownTrigger.setAttribute("aria-expanded", String(isHidden));
          return;
        }

        if (hoverPreviewActive && !hoverPinned) {
          e.preventDefault();
          hoverPinned = true;
          hoverPreviewActive = false;
          dropdownTrigger.setAttribute("aria-expanded", "true");
        }
      });

      submenu.addEventListener("toggle", (e) => {
        if (!isWide) return;
        const open = e.newState === "open";
        dropdownTrigger.setAttribute("aria-expanded", String(open));
        if (open) {
          positionSubmenuFallback();
        } else {
          hoverPinned = false;
          hoverPreviewActive = false;
          if (!lastInputKeyboard && document.activeElement === dropdownTrigger) {
            dropdownTrigger.blur();
          }
        }
      });

      dropdownItem.addEventListener("pointerenter", (e) => {
        if (!isWide || e.pointerType === "touch" || !window.matchMedia("(hover: hover)").matches) return;
        if (typeof submenu.showPopover === "function" && !submenu.matches(":popover-open, .\\:popover-open")) {
          hoverPreviewActive = true;
          hoverPinned = false;
          try {
            submenu.showPopover({ source: dropdownTrigger });
          } catch {
            try {
              submenu.showPopover();
            } catch {
              // Ignore
            }
          }
        }
      });

      dropdownItem.addEventListener("pointerleave", () => {
        if (!isWide) return;
        if (hoverPreviewActive && !hoverPinned && typeof submenu.hidePopover === "function") {
          try {
            submenu.hidePopover();
          } catch {
            // Ignore
          }
          hoverPreviewActive = false;
        }
      });

      dropdownItem.addEventListener("focusout", (e) => {
        if (!isWide) return;
        if (e.relatedTarget && !dropdownItem.contains(e.relatedTarget)) {
          if (typeof submenu.hidePopover === "function" && submenu.matches(":popover-open, .\\:popover-open")) {
            try {
              submenu.hidePopover();
            } catch {
              // Ignore
            }
          }
        }
      });
    }

    // Close collapsed popover menu when selecting an anchor link
    siteMenu.addEventListener("click", (e) => {
      if (!isWide && e.target instanceof Element && e.target.closest("a") && typeof siteMenu.hidePopover === "function") {
        try {
          siteMenu.hidePopover();
        } catch {
          // Ignore
        }
      }
    });
  }

  // 4. Products Page Filter
  const filterButtons = Array.from(document.querySelectorAll(".filter-btn[data-filter]"));
  const productItems = Array.from(document.querySelectorAll(".product-item[data-category]"));
  const filterStatus = document.getElementById("filter-status");

  if (filterButtons.length > 0 && productItems.length > 0) {
    filterButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        const selected = btn.getAttribute("data-filter") || "all";
        filterButtons.forEach((b) => b.setAttribute("aria-pressed", String(b === btn)));

        let visibleCount = 0;
        productItems.forEach((item) => {
          const cat = item.getAttribute("data-category") || "";
          const show = selected === "all" || cat.split(/\s+/).includes(selected);
          item.hidden = !show;
          if (show) visibleCount += 1;
        });

        if (filterStatus) {
          filterStatus.textContent = `Showing ${visibleCount} ${visibleCount === 1 ? "item" : "items"}.`;
        }
      });
    });
  }

  // 5. Native <dialog> Gallery Lightbox
  const galleryDialog = document.getElementById("gallery-dialog");
  const galleryTriggers = Array.from(document.querySelectorAll(".gallery-trigger[data-index]"));

  if (galleryDialog instanceof HTMLDialogElement && galleryTriggers.length > 0) {
    const dialogImg = document.getElementById("dialog-img");
    const dialogCounter = document.getElementById("dialog-counter");
    const prevBtn = document.getElementById("dialog-prev");
    const nextBtn = document.getElementById("dialog-next");
    let activeIndex = 0;

    const renderSlide = (idx) => {
      activeIndex = (idx + galleryTriggers.length) % galleryTriggers.length;
      const trigger = galleryTriggers[activeIndex];
      const img = trigger.querySelector("img");
      if (dialogImg instanceof HTMLImageElement && img) {
        dialogImg.src = img.currentSrc || img.src;
        dialogImg.alt = img.alt || `Installation photo ${activeIndex + 1}`;
        if (img.naturalWidth && img.naturalHeight) {
          dialogImg.width = img.naturalWidth;
          dialogImg.height = img.naturalHeight;
        }
      }
      if (dialogCounter) {
        dialogCounter.textContent = `Photo ${activeIndex + 1} / ${galleryTriggers.length}`;
      }
    };

    galleryTriggers.forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const idx = Number(trigger.getAttribute("data-index")) || 0;
        renderSlide(idx);
        galleryDialog.showModal();
      });
    });

    prevBtn?.addEventListener("click", () => renderSlide(activeIndex - 1));
    nextBtn?.addEventListener("click", () => renderSlide(activeIndex + 1));

    galleryDialog.addEventListener("keydown", (e) => {
      if (!galleryDialog.open) return;
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        renderSlide(activeIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        renderSlide(activeIndex + 1);
      }
    });

    // Light-dismiss fallback for browsers without native closedby="any"
    if (!("closedBy" in HTMLDialogElement.prototype)) {
      const isOutside = (e, dialog) => {
        const rect = dialog.getBoundingClientRect();
        return e.clientX < rect.left || e.clientX > rect.right || e.clientY < rect.top || e.clientY > rect.bottom;
      };
      let pressedOutside = false;
      galleryDialog.addEventListener("pointerdown", (e) => {
        pressedOutside = isOutside(e, galleryDialog);
      });
      galleryDialog.addEventListener("pointerup", (e) => {
        if (pressedOutside && isOutside(e, galleryDialog)) {
          galleryDialog.close();
        }
        pressedOutside = false;
      });
    }
  }

  // 6. Contact & Quotation Form (Web3Forms with progressive enhancement)
  const contactForm = document.getElementById("contact-form");
  if (contactForm instanceof HTMLFormElement) {
    const statusBox = document.getElementById("form-status");
    const submitBtn = document.getElementById("submit-btn");
    const whatsappBtn = document.getElementById("whatsapp-quote-btn");
    const serviceSelect = document.getElementById("inquiry-service");
    const messageField = document.getElementById("inquiry-message");

    // Pre-fill service or product interest from query parameters (?service=...&item=...)
    const params = new URLSearchParams(window.location.search);
    const serviceParam = params.get("service");
    const itemParam = params.get("item");
    if (serviceSelect instanceof HTMLSelectElement && serviceParam) {
      const matched = Array.from(serviceSelect.options).find((opt) => opt.value === serviceParam);
      if (matched) serviceSelect.value = serviceParam;
    }
    if (messageField instanceof HTMLTextAreaElement && itemParam && !messageField.value.trim()) {
      messageField.value = `Hello, I would like a quotation / consultation regarding: ${itemParam}.`;
    }

    const trackedFields = Array.from(contactForm.querySelectorAll("input[required], select[required], textarea[required]"));
    const touched = new WeakSet();

    const validateField = (field) => {
      const errorEl = document.getElementById(`${field.id}-error`);
      let message = "";
      if (field.validity.valueMissing) {
        message = "This field is required.";
      } else if (field.validity.typeMismatch && field.type === "email") {
        message = "Please enter a valid email address (for example, name@company.com).";
      } else if (field.validity.tooShort) {
        message = `Please enter at least ${field.minLength} characters.`;
      }

      if (message) {
        field.setAttribute("aria-invalid", "true");
        if (errorEl) {
          errorEl.textContent = message;
          errorEl.classList.add("visible");
        }
        return false;
      }

      field.removeAttribute("aria-invalid");
      if (errorEl) {
        errorEl.textContent = "";
        errorEl.classList.remove("visible");
      }
      return true;
    };

    trackedFields.forEach((field) => {
      field.addEventListener("blur", () => {
        touched.add(field);
        validateField(field);
      });
      field.addEventListener("input", () => {
        if (touched.has(field) || field.hasAttribute("aria-invalid")) {
          validateField(field);
        }
      });
    });

    const showStatus = (kind, text) => {
      if (!statusBox) return;
      statusBox.hidden = false;
      statusBox.className = `form-status ${kind === "success" ? "is-success" : "is-error"}`;
      statusBox.textContent = text;
    };

    contactForm.addEventListener("submit", async (e) => {
      e.preventDefault();

      let firstInvalid = null;
      trackedFields.forEach((field) => {
        touched.add(field);
        if (!validateField(field) && !firstInvalid) {
          firstInvalid = field;
        }
      });

      if (firstInvalid) {
        showStatus("error", "Please review the highlighted fields before submitting.");
        firstInvalid.focus();
        return;
      }

      const originalText = submitBtn ? submitBtn.textContent : "Submit Inquiry";
      if (submitBtn instanceof HTMLButtonElement) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending inquiry...";
      }

      try {
        const formData = new FormData(contactForm);
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: formData
        });
        const result = await response.json();

        if (response.ok && result.success) {
          showStatus(
            "success",
            "Thank you! Your quotation / consultation request has been received. Our team will respond shortly."
          );
          contactForm.reset();
          trackedFields.forEach((f) => f.removeAttribute("aria-invalid"));
        } else {
          showStatus(
            "error",
            result.message || "We could not submit the form right now. Please email us at precisianscientific@gmail.com or use WhatsApp."
          );
        }
      } catch {
        showStatus(
          "error",
          "Network error while sending your inquiry. Please try again or reach us directly via phone, email, or WhatsApp."
        );
      } finally {
        if (submitBtn instanceof HTMLButtonElement) {
          submitBtn.disabled = false;
          submitBtn.textContent = originalText;
        }
      }
    });

    if (whatsappBtn instanceof HTMLAnchorElement) {
      whatsappBtn.addEventListener("click", () => {
        const name = (document.getElementById("inquiry-name")?.value || "").trim();
        const org = (document.getElementById("inquiry-org")?.value || "").trim();
        const service = (serviceSelect?.value || "").trim();
        const location = (document.getElementById("inquiry-location")?.value || "").trim();
        const msg = (messageField?.value || "").trim();

        const parts = ["Hello Precisian Scientific Instrument Suppliers, I would like a quotation."];
        if (name) parts.push(`Name: ${name}`);
        if (org) parts.push(`Organization: ${org}`);
        if (service) parts.push(`Service: ${service}`);
        if (location) parts.push(`Location: ${location}`);
        if (msg) parts.push(`Details: ${msg}`);

        whatsappBtn.href = `https://wa.me/917001796779?text=${encodeURIComponent(parts.join("\n"))}`;
      });
    }
  }
})();
