const titleField = document.getElementById("title");
const editor = document.getElementById("editor");
const formatMenu = document.getElementById("format-menu");
const saveFormatBar = document.getElementById("save-format-bar");
const sectionFinder = document.getElementById("section-finder");
const sectionList = document.getElementById("section-list");
const referencesHeading = document.getElementById("references-heading");
const referencesList = document.getElementById("references-list");
const referencesSection = document.getElementById("references-section");
const citationSidebar = document.getElementById("citation-sidebar");
const citationList = document.getElementById("citation-list");
const citationInput = document.getElementById("citation-input");
const citationAuthorInput = document.getElementById("citation-author-input");
const citationTitleInput = document.getElementById("citation-title-input");
const citationSourceInput = document.getElementById("citation-source-input");
const citationYearInput = document.getElementById("citation-year-input");
const citationUrlInput = document.getElementById("citation-url-input");
const citationAccessedInput = document.getElementById("citation-accessed-input");
const citationPreview = document.getElementById("citation-preview");
const citationAddButton = document.getElementById("citation-add-button");
const mediaStorageSidebar = document.getElementById("media-storage-sidebar");
const mediaStorageList = document.getElementById("media-storage-list");
const tableSidebar = document.getElementById("table-sidebar");
const tableTabStructureButton = document.getElementById("table-tab-structure");
const tableTabAnalyzeButton = document.getElementById("table-tab-analyze");
const tablePanelStructure = document.getElementById("table-panel-structure");
const tablePanelAnalyze = document.getElementById("table-panel-analyze");
const tableCaptionInput = document.getElementById("table-caption-input");
const tableAddRowButton = document.getElementById("table-add-row-btn");
const tableRemoveRowButton = document.getElementById("table-remove-row-btn");
const tableAddColButton = document.getElementById("table-add-col-btn");
const tableRemoveColButton = document.getElementById("table-remove-col-btn");
const tableAnalysisPrecisionInput = document.getElementById("table-analysis-precision");
const tableUncertaintySourceSelect = document.getElementById("table-uncertainty-source");
const tableAddColumnMeanButton = document.getElementById("table-add-col-mean-btn");
const tableAddRowMeanButton = document.getElementById("table-add-row-mean-btn");
const tableAddColumnStdButton = document.getElementById("table-add-col-std-btn");
const tableAddRowStdButton = document.getElementById("table-add-row-std-btn");
const tableApplyUncertaintyButton = document.getElementById("table-apply-uncertainty-btn");
const tableClearUncertaintyButton = document.getElementById("table-clear-uncertainty-btn");
const windowStatus = document.getElementById("window-status");
const wordCountStatus = document.getElementById("word-count-status");
const pageCountStatus = document.getElementById("page-count-status");
const metadataPane = document.getElementById("metadata-pane");
const citationFormatSelect = document.getElementById("citation-format-select");
const pageSizeSelect = document.getElementById("page-size-select");
const pageOrientationSelect = document.getElementById("page-orientation-select");
const marginTopInput = document.getElementById("margin-top-input");
const marginRightInput = document.getElementById("margin-right-input");
const marginBottomInput = document.getElementById("margin-bottom-input");
const marginLeftInput = document.getElementById("margin-left-input");
const inlineCommandMenu = document.getElementById("inline-command-menu");
const pageSurface = document.querySelector(".page");
const pageFrameLayer = document.createElement("div");
pageFrameLayer.className = "page-frame-layer";
const autoPageBreakLayer = document.createElement("div");
autoPageBreakLayer.className = "auto-page-break-layer";
const pageCornerLayer = document.createElement("div");
pageCornerLayer.className = "page-corner-layer";
if (pageSurface) {
  pageSurface.append(pageFrameLayer, autoPageBreakLayer, pageCornerLayer);
}

const PAPER_FORMAT = "paper";
const PAPER_VERSION = 1;
const APP_ASSET_VERSION = "87";
const PAPER_MIME = "application/x-paper+json";
const DOCX_MIME = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
const PDF_MIME = "application/pdf";
const DEFAULT_FILE_NAME = "Untitled.paper";
const DEFAULT_REFERENCES_HEADING = "References";
const DRAFT_STORAGE_KEY = "minimal-editor-draft-v1";
const MEDIA_STORAGE_GLOBAL_KEY = "minimal-editor-media-storage-v1";
const DOUBLE_SHIFT_WINDOW_MS = 280;
const TAB_HOLD_OPEN_MS = 340;
const AUTO_SAVE_DELAY_MS = 1400;
const DRAFT_PERSIST_DELAY_MS = 360;
const SOFT_PAGE_GUIDE_DELAY_MS = 90;
const TYPING_PAGE_GUIDE_DELAY_MS = 180;
const RELAXED_TYPING_PAGE_GUIDE_DELAY_MS = 420;
const TABLE_TYPING_PAGE_GUIDE_DELAY_MS = 280;
const WORD_COUNT_REFRESH_DELAY_MS = 180;
const LATEX_RENDER_DELAY_MS = 120;
const PAGE_FLOW_RELAXED_BOUNDARY_THRESHOLD_PX = 72;
const PAGE_FLOW_SPLIT_MIN_OFFSET = 24;

const DEFAULT_PDF_PAGE_WIDTH = 612;
const DEFAULT_PDF_PAGE_HEIGHT = 792;
const PX_TO_PT = 72 / 96;
const REFERENCES_BASE_MARGIN_PX = 0.35 * 96;
const POINTS_PER_INCH = 72;
const TWIPS_PER_INCH = 1440;
const DEFAULT_PAGE_MARGINS_IN = Object.freeze({
  top: 1,
  right: 1,
  bottom: 1,
  left: 1
});
const MIN_PAGE_MARGIN_IN = 0;
const MAX_PAGE_MARGIN_IN = 3;
const MEDIA_STORAGE_SLOT_LIMIT = 5;

const MENU_ITEMS = [
  { id: "bold", label: "B", command: "bold" },
  { id: "underline", label: "U", command: "underline" },
  { id: "italic", label: "/", command: "italic" },
  { id: "strike", label: "S", command: "strikeThrough" },
  { id: "superscript", label: "^", command: "superscript" },
  { id: "subscript", label: "_", command: "subscript" },
  { id: "highlight", label: "H", command: "highlight-yellow" },
  { id: "subtitle", label: "T", command: "subtitle" },
  { id: "align-left", label: "L", command: "justifyLeft" },
  { id: "align-center", label: "C", command: "justifyCenter" },
  { id: "align-right", label: "R", command: "justifyRight" },
  { id: "align-justify", label: "J", command: "justifyFull" },
  { id: "unordered-list", label: "•", command: "insertUnorderedList" },
  { id: "ordered-list", label: "1.", command: "insertOrderedList" }
];

const SAVE_FORMAT_OPTIONS = [
  { id: "paper", label: ".paper" },
  { id: "docx", label: ".docx" },
  { id: "pdf", label: ".pdf" }
];

const INLINE_COMMANDS = [
  { id: "cite", trigger: "\\cite", label: "Citation" },
  { id: "section", trigger: "\\section", label: "Section" },
  { id: "subtitle", trigger: "\\subtitle", label: "Subtitle" },
  { id: "subsection", trigger: "\\subsection", label: "Subsection" },
  { id: "subsubsection", trigger: "\\subsubsection", label: "Subsubsection" },
  { id: "bullets", trigger: "\\bullets", label: "Bulleted List" },
  { id: "numbered", trigger: "\\numbered", label: "Numbered List" },
  { id: "table", trigger: "\\table", label: "Table" },
  { id: "pagebreak", trigger: "\\pagebreak", label: "Page Break" },
  { id: "math", trigger: "\\math", label: "Math" },
  { id: "graph", trigger: "\\graph", label: "Graph Block" },
  { id: "image", trigger: "\\image", label: "Image Block" }
];

const CITATION_FORMATS = new Set(["MLA", "APA", "Chicago", "Custom"]);
const PAGE_SIZES = new Set(["endless", "A4", "Letter"]);
const PAGE_ORIENTATIONS = new Set(["portrait", "landscape"]);
const PARAGRAPH_ALIGNMENTS = new Set(["left", "center", "right", "justify"]);
const PAGE_ASSIST_KINDS = new Set(["note", "header", "footer", "page-number"]);
const PAGE_NUMBER_POSITIONS = new Set(["top", "bottom"]);
const PAGE_ASSIST_VERTICAL_GAP_PX = 8;
const PAGE_ASSIST_MIN_HEIGHT_PX = 14;

const SCREEN_PAGE_DIMENSIONS_IN = Object.freeze({
  A4: { width: 8.27, height: 11.69 },
  Letter: { width: 8.5, height: 11 }
});

const PDF_PAGE_DIMENSIONS_PT = Object.freeze({
  A4: { width: 595.28, height: 841.89 },
  Letter: { width: DEFAULT_PDF_PAGE_WIDTH, height: DEFAULT_PDF_PAGE_HEIGHT }
});

const BASE_INLINE_STYLE = Object.freeze({
  bold: false,
  italic: false,
  underline: false,
  strike: false,
  superscript: false,
  subscript: false
});

const INLINE_STYLE_TAGS = new Set(["b", "strong", "i", "em", "u", "s", "strike", "del", "sup", "sub"]);
const BLOCK_TAGS = new Set(["p", "div", "li", "blockquote", "h2", "h3", "h4", "h5"]);
const SECTION_HEADING_TAGS = new Set(["h2", "h3", "h4"]);

let menuOpen = false;
let menuIndex = 0;
let menuAnchorRange = null;
let lastShiftTapAt = 0;
let saveTimer = null;
let draftPersistIdleHandle = 0;
let autoSaveTimer = null;
let autoSaveInFlight = false;
let editRevision = 0;
let autoSaveQueuedRevision = 0;
let activeDocumentToken = 0;
let autoLinkTimer = null;
let pendingAutoLinkIncludePrevious = false;
let saveFormatOpen = false;
let saveFormatIndex = 0;
let sectionFinderOpen = false;
let sectionIndex = 0;
let sectionEntries = [];
let tabHeld = false;
let tabHoldTimer = null;
let tabTapPending = false;
let tabTapOutdent = false;
let citationSidebarOpen = false;
let citationIndex = 0;
let citationFigureIndex = -1;
let citationTableIndex = -1;
let citations = [];
let citationInsertPending = false;
let pendingCitationRange = null;
let mediaStorageSidebarOpen = false;
const emptyMediaSlots = () => Array.from({ length: MEDIA_STORAGE_SLOT_LIMIT }, () => null);
let mediaStorageSlots = emptyMediaSlots();
let mediaStorageInsertRange = null;
let mediaStoragePersistTimer = null;
let metadataOpen = false;
let metadataSettings = {
  citationFormat: "MLA",
  pageSize: "endless",
  pageOrientation: "portrait",
  pageMargins: { ...DEFAULT_PAGE_MARGINS_IN }
};
let inlineCommandOpen = false;
let inlineCommandIndex = 0;
let inlineCommandMatches = [];
let inlineCommandPrefix = "\\";
let skipInlineCommandSyncOnce = false;
let currentFileName = DEFAULT_FILE_NAME;
let currentFileHandle = null;
let currentNativeFilePath = "";
let hasUnsavedChanges = false;
let pendingAdapterState = {};
let preservedAdapterState = {};
let activeGraphBlock = null;
let activeImageBlock = null;
let activeTableElement = null;
let tableSidebarOpen = false;
let tableSidebarTab = "structure";
let pageGuideSyncFrame = 0;
let softPageGuideTimer = null;
let typingPageGuideTimer = null;
let renderedPageCount = 1;
let statusSyncFrame = 0;
let statusNeedsWordRefresh = true;
let wordCountRefreshTimer = null;
let latexRenderTimer = null;
let mediaSyncFrame = 0;
let mediaSyncNeedsRenumber = false;
let openPageCornerMenu = null;
let draggedMediaBlock = null;
let mediaDropPlacement = null;
let mediaDropIndicator = null;
let pageFlowSplitCounter = 0;

const menuNodes = new Map();
const saveFormatNodes = new Map();
const featureAdapters = new Map();
const featureStateBag = Object.create(null);
const graphBoundBlocks = new WeakSet();
const imageBoundBlocks = new WeakSet();

const textEncoder = new TextEncoder();
const textMeasureCanvas = document.createElement("canvas");
const textMeasureContext = textMeasureCanvas.getContext("2d");
const desktopBridge =
  window.paperDesktop && typeof window.paperDesktop === "object" && window.paperDesktop.isDesktop
    ? window.paperDesktop
    : null;

const fileInput = document.createElement("input");
fileInput.type = "file";
fileInput.accept = ".paper,application/json,text/plain";
fileInput.style.display = "none";
document.body.append(fileInput);

const ensureExtension = (fileName, extension) => {
  const normalizedExtension = extension.startsWith(".") ? extension : `.${extension}`;
  const trimmed = String(fileName || "").trim();
  if (!trimmed) return `Untitled${normalizedExtension}`;
  return trimmed.toLowerCase().endsWith(normalizedExtension.toLowerCase())
    ? trimmed
    : `${trimmed}${normalizedExtension}`;
};

const ensurePaperExtension = (fileName) => ensureExtension(fileName, ".paper");

const fileNameFromPath = (filePath) => {
  const raw = String(filePath || "").trim();
  if (!raw) return "";
  const parts = raw.split(/[\\/]/).filter(Boolean);
  return parts.length > 0 ? parts[parts.length - 1] : "";
};

const normalizeDialogExtensions = (extensions = []) => {
  if (!Array.isArray(extensions)) return [];
  return extensions
    .map((entry) => String(entry || "").trim().replace(/^\./, ""))
    .filter(Boolean);
};

const supportsDesktopBridge = () => {
  if (!desktopBridge) return false;
  return (
    typeof desktopBridge.pickSavePath === "function" &&
    typeof desktopBridge.pickOpenPath === "function" &&
    typeof desktopBridge.writeTextFile === "function" &&
    typeof desktopBridge.readTextFile === "function" &&
    typeof desktopBridge.writeBinaryFile === "function"
  );
};

const exportBaseName = () => {
  const normalized = ensurePaperExtension(currentFileName);
  const withoutExtension = normalized.replace(/\.paper$/i, "").trim();
  return withoutExtension || "Untitled";
};

const updateWindowTitle = () => {
  document.title = `${hasUnsavedChanges ? "• " : ""}${ensurePaperExtension(currentFileName)}`;
};

const setDirty = (isDirty) => {
  hasUnsavedChanges = Boolean(isDirty);
  updateWindowTitle();
};

const isElementNode = (node) => node && node.nodeType === Node.ELEMENT_NODE;

const normalizeInlineText = (value) => {
  return String(value || "")
    .replace(/\u200b/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const isSectionHeadingElement = (node) => {
  return node instanceof HTMLElement && SECTION_HEADING_TAGS.has(node.tagName.toLowerCase());
};

const sectionHeadingLevel = (heading) => {
  if (!isSectionHeadingElement(heading)) return 0;
  const level = Number(heading.tagName.slice(1));
  return Number.isFinite(level) ? level : 0;
};

const topLevelChildForRootNode = (root, node) => {
  if (!(root instanceof HTMLElement)) return null;
  let element = isElementNode(node) ? node : node && node.parentElement;
  while (element && element.parentElement !== root) {
    if (element === root) return null;
    element = element.parentElement;
  }
  return element && element.parentElement === root ? element : null;
};

const sectionBoundarySibling = (heading) => {
  if (!isSectionHeadingElement(heading)) return null;
  const level = sectionHeadingLevel(heading);
  let cursor = heading.nextElementSibling;
  while (cursor) {
    if (isSectionHeadingElement(cursor) && sectionHeadingLevel(cursor) <= level) {
      return cursor;
    }
    cursor = cursor.nextElementSibling;
  }
  return null;
};

const nodeHasMeaningfulSectionContent = (node) => {
  if (!(node instanceof HTMLElement)) return false;
  if (node.classList.contains("media-drop-indicator")) return false;
  if (node.classList.contains("page-assist")) return false;
  if (node.classList.contains("page-break-block")) return false;
  if (node.classList.contains("graph-block") || node.classList.contains("image-block")) return true;
  if (node.matches("table")) return true;

  const text = normalizeInlineText(node.textContent);
  if (text.length > 0) return true;

  return Boolean(node.querySelector("img, svg, canvas, video, audio, iframe, table, .graph-block, .image-block"));
};

const sectionHasMeaningfulContent = (heading, cache = new WeakMap()) => {
  if (!isSectionHeadingElement(heading)) return false;
  if (cache.has(heading)) {
    return cache.get(heading);
  }

  const level = sectionHeadingLevel(heading);
  let hasContent = false;
  let cursor = heading.nextElementSibling;
  while (cursor) {
    if (isSectionHeadingElement(cursor)) {
      const nestedLevel = sectionHeadingLevel(cursor);
      if (nestedLevel <= level) break;
      if (sectionHasMeaningfulContent(cursor, cache)) {
        hasContent = true;
        break;
      }
      cursor = sectionBoundarySibling(cursor);
      continue;
    }
    if (nodeHasMeaningfulSectionContent(cursor)) {
      hasContent = true;
      break;
    }
    cursor = cursor.nextElementSibling;
  }

  cache.set(heading, hasContent);
  return hasContent;
};

const activeSectionHeadingForRoot = (root) => {
  if (!(root instanceof HTMLElement)) return null;
  const selectionNode = getSelectionNode();
  if (!selectionNode) return null;
  const selectionElement = isElementNode(selectionNode) ? selectionNode : selectionNode.parentElement;
  if (!(selectionElement instanceof Element) || !root.contains(selectionElement)) return null;

  const directHeading = selectionElement.closest("h2, h3, h4");
  if (directHeading instanceof HTMLElement && directHeading.parentElement === root) {
    return directHeading;
  }

  const topLevel = topLevelChildForRootNode(root, selectionNode);
  if (!(topLevel instanceof HTMLElement)) return null;
  if (isSectionHeadingElement(topLevel)) return topLevel;

  let cursor = topLevel.previousElementSibling;
  while (cursor) {
    if (isSectionHeadingElement(cursor)) {
      return cursor;
    }
    cursor = cursor.previousElementSibling;
  }
  return null;
};

const protectedSectionHeadings = (root, activeHeading) => {
  const protectedHeadings = new Set();
  if (!(root instanceof HTMLElement) || !isSectionHeadingElement(activeHeading) || activeHeading.parentElement !== root) {
    return protectedHeadings;
  }

  protectedHeadings.add(activeHeading);
  let nextLevel = sectionHeadingLevel(activeHeading);
  let cursor = activeHeading.previousElementSibling;
  while (cursor && nextLevel > 2) {
    if (isSectionHeadingElement(cursor)) {
      const cursorLevel = sectionHeadingLevel(cursor);
      if (cursorLevel > 0 && cursorLevel < nextLevel) {
        protectedHeadings.add(cursor);
        nextLevel = cursorLevel;
      }
    }
    cursor = cursor.previousElementSibling;
  }

  return protectedHeadings;
};

const pruneEmptySectionHeadings = (root, options = {}) => {
  if (!(root instanceof HTMLElement)) return false;
  const preserveSelectionHeading = Boolean(options.preserveSelectionHeading);
  const activeHeading = preserveSelectionHeading ? activeSectionHeadingForRoot(root) : null;
  const guardedHeadings = preserveSelectionHeading ? protectedSectionHeadings(root, activeHeading) : new Set();

  let changed = false;
  let removedInPass = false;
  do {
    removedInPass = false;
    const contentCache = new WeakMap();
    const headings = Array.from(root.children).filter((child) => isSectionHeadingElement(child)).reverse();
    for (const heading of headings) {
      if (!(heading instanceof HTMLElement) || heading.parentElement !== root) continue;
      if (guardedHeadings.has(heading)) continue;
      if (sectionHasMeaningfulContent(heading, contentCache)) continue;

      const boundary = sectionBoundarySibling(heading);
      let cursor = heading;
      while (cursor && cursor !== boundary) {
        const next = cursor.nextElementSibling;
        cursor.remove();
        cursor = next;
      }

      changed = true;
      removedInPass = true;
    }
  } while (removedInPass);

  return changed;
};

const getSelectionNode = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  return selection.anchorNode;
};

const captureCurrentSelectionRange = (container) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const anchorNode = selection.anchorNode;
  if (!anchorNode || !container.contains(anchorNode)) return null;
  return selection.getRangeAt(0).cloneRange();
};

const isSelectionInsideNode = (node) => {
  if (!(node instanceof Node)) return false;
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const anchorNode = selection.anchorNode;
  const focusNode = selection.focusNode;
  const contains = (candidate) => Boolean(candidate) && (candidate === node || node.contains(candidate));
  return contains(anchorNode) || contains(focusNode);
};

const restoreSelectionRange = (range) => {
  if (!range) return false;
  const selection = window.getSelection();
  if (!selection) return false;
  try {
    selection.removeAllRanges();
    selection.addRange(range);
    return true;
  } catch {
    return false;
  }
};

const isInsideEditableSurface = (node) => {
  if (!node) return false;
  const element = isElementNode(node) ? node : node.parentElement;
  if (!element) return false;
  return titleField.contains(element) || editor.contains(element);
};

const isInsideFormattingSurface = (node) => {
  if (isInsideEditableSurface(node)) return true;
  if (!referencesHeading) return false;
  if (!node) return false;
  const element = isElementNode(node) ? node : node.parentElement;
  if (!element) return false;
  return referencesHeading.contains(element);
};

const getSelectionElement = () => {
  const node = getSelectionNode();
  if (!node) return null;
  return isElementNode(node) ? node : node.parentElement;
};

const captureMenuAnchorRange = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;
  const anchorNode = selection.anchorNode;
  if (!anchorNode) return null;
  if (!isInsideFormattingSurface(anchorNode)) return null;
  return selection.getRangeAt(0).cloneRange();
};

const restoreMenuAnchorRange = () => {
  if (!menuAnchorRange) return false;
  const startContainer = menuAnchorRange.startContainer;
  if (!startContainer || !startContainer.isConnected) return false;
  const holder = isElementNode(startContainer) ? startContainer : startContainer.parentElement;
  if (!holder) return false;
  if (!isInsideFormattingSurface(holder)) return false;
  return restoreSelectionRange(menuAnchorRange);
};

const isHeadingActive = () => {
  const element = getSelectionElement();
  if (!element) return false;
  return Boolean(element.closest("h2, h3, h4"));
};

const isSubtitleActive = () => {
  const element = getSelectionElement();
  if (!element) return false;
  return Boolean(element.closest("h5"));
};

const normalizeColorToken = (value) => {
  return String(value || "").replace(/\s+/g, "").toLowerCase();
};

const isYellowHighlightValue = (value) => {
  const token = normalizeColorToken(value);
  return (
    token === "yellow" ||
    token === "#ff0" ||
    token === "#ffff00" ||
    token === "rgb(255,255,0)" ||
    token === "rgba(255,255,0,1)" ||
    token === "rgba(255,255,0,1.0)"
  );
};

const queryValue = (command) => {
  try {
    return document.queryCommandValue(command);
  } catch {
    return "";
  }
};

const isHighlightActive = () => {
  const element = getSelectionElement();
  if (!element) return false;

  let current = element;
  while (current && current instanceof HTMLElement) {
    if (isYellowHighlightValue(current.style.backgroundColor) || isYellowHighlightValue(current.style.background)) {
      return true;
    }
    if (current === editor || current === titleField || (referencesHeading && current === referencesHeading)) {
      break;
    }
    current = current.parentElement;
  }

  if (isYellowHighlightValue(queryValue("hiliteColor"))) return true;
  if (isYellowHighlightValue(queryValue("backColor"))) return true;
  return false;
};

const toggleYellowHighlight = () => {
  const active = isHighlightActive();
  let applied = false;
  document.execCommand("styleWithCSS", false, true);
  try {
    if (active) {
      const clearPrimary = document.execCommand("hiliteColor", false, "transparent");
      const clearFallback = document.execCommand("backColor", false, "transparent");
      applied = Boolean(clearPrimary || clearFallback);
    } else {
      const setPrimary = document.execCommand("hiliteColor", false, "#ffff00");
      const setFallback = setPrimary ? false : document.execCommand("backColor", false, "#ffff00");
      applied = Boolean(setPrimary || setFallback);
    }
  } finally {
    document.execCommand("styleWithCSS", false, false);
  }
  return applied;
};

const queryState = (command) => {
  try {
    return document.queryCommandState(command);
  } catch {
    return false;
  }
};

const currentOptionActive = (option) => {
  if (option.command === "highlight-yellow") return isHighlightActive();
  if (option.command === "heading") return isHeadingActive();
  if (option.command === "subtitle") return isSubtitleActive();
  return queryState(option.command);
};

const buildMenu = () => {
  for (const option of MENU_ITEMS) {
    const item = document.createElement("span");
    item.className = "format-item";
    item.dataset.id = option.id;
    item.textContent = option.label;
    formatMenu.append(item);
    menuNodes.set(option.id, item);
  }
};

const updateMenuVisuals = () => {
  MENU_ITEMS.forEach((option, index) => {
    const node = menuNodes.get(option.id);
    if (!node) return;
    node.classList.toggle("is-selected", menuOpen && index === menuIndex);
    node.classList.toggle("is-active", currentOptionActive(option));
  });
};

const buildSaveFormatBar = () => {
  for (const option of SAVE_FORMAT_OPTIONS) {
    const item = document.createElement("span");
    item.className = "save-format-option";
    item.dataset.format = option.id;
    item.textContent = option.label;
    saveFormatBar.append(item);
    saveFormatNodes.set(option.id, item);
  }
};

const updateSaveFormatVisuals = () => {
  SAVE_FORMAT_OPTIONS.forEach((option, index) => {
    const node = saveFormatNodes.get(option.id);
    if (!node) return;
    node.classList.toggle("is-selected", saveFormatOpen && index === saveFormatIndex);
    node.classList.toggle("is-active", saveFormatOpen && index === saveFormatIndex);
  });
};

const openSaveFormatBar = () => {
  closeAllPanels();
  saveFormatOpen = true;
  saveFormatIndex = 0;
  saveFormatBar.classList.add("is-open");
  saveFormatBar.setAttribute("aria-hidden", "false");
  updateSaveFormatVisuals();
};

const closeSaveFormatBar = () => {
  saveFormatOpen = false;
  saveFormatBar.classList.remove("is-open");
  saveFormatBar.setAttribute("aria-hidden", "true");
  updateSaveFormatVisuals();
};

const moveSaveFormatSelection = (step) => {
  if (!saveFormatOpen) return;
  saveFormatIndex = (saveFormatIndex + step + SAVE_FORMAT_OPTIONS.length) % SAVE_FORMAT_OPTIONS.length;
  updateSaveFormatVisuals();
};

const focusEditableTargetAtEnd = (target) => {
  if (!(target instanceof HTMLElement)) return false;
  target.focus({ preventScroll: true });
  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.selectNodeContents(target);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const focusEditorAtEnd = () => {
  focusEditableTargetAtEnd(editor);
};

const ensureSelectionOnSurface = () => {
  if (isInsideEditableSurface(getSelectionNode())) return;
  focusEditorAtEnd();
};

const ensureSelectionInEditor = () => {
  const node = getSelectionNode();
  if (node && editor.contains(node)) return;
  focusEditorAtEnd();
};

const ensureSelectionOnFormattingSurface = () => {
  if (isInsideFormattingSurface(getSelectionNode())) return;
  const active = document.activeElement;
  if (referencesHeading && active === referencesHeading) {
    if (focusEditableTargetAtEnd(referencesHeading)) return;
  }
  ensureSelectionOnSurface();
};

const isEditableTextBlock = (element) => {
  if (!(element instanceof HTMLElement)) return false;
  if (element.closest(".graph-block, .image-block, .page-assist, .page-break-block")) return false;
  return element.matches("p, div, blockquote");
};

const isVisiblyEmptyTextBlock = (element) => {
  if (!isEditableTextBlock(element)) return false;
  const text = String(element.textContent || "")
    .replace(/\u200b/g, "")
    .replace(/\u00a0/g, " ")
    .trim();
  if (text.length > 0) return false;
  const hasMeaningfulElementChild = Array.from(element.children).some((child) => child.tagName !== "BR");
  return !hasMeaningfulElementChild;
};

const ensureParagraphAfterMediaBlock = (block, options = {}) => {
  if (!(block instanceof HTMLElement) || !editor.contains(block)) {
    return { paragraph: null, changed: false };
  }
  const { forceClear = false } = options;
  let changed = false;
  let paragraph = null;
  const nextSibling = block.nextElementSibling;

  if (isVisiblyEmptyTextBlock(nextSibling)) {
    paragraph = nextSibling;
  } else {
    paragraph = document.createElement("p");
    paragraph.innerHTML = "<br>";
    block.insertAdjacentElement("afterend", paragraph);
    changed = true;
  }

  if (forceClear && paragraph && !paragraph.classList.contains("media-clear-paragraph")) {
    paragraph.classList.add("media-clear-paragraph");
    changed = true;
  }

  return { paragraph, changed };
};

const shouldForceClearAfterMediaBlock = (block) => {
  if (!(block instanceof HTMLElement)) return false;
  if (block.classList.contains("graph-block")) return true;
  if (block.classList.contains("image-block")) {
    const wrap = String(block.dataset.imageWrap || "break").trim().toLowerCase();
    return wrap !== "left" && wrap !== "right";
  }
  return false;
};

const syncFollowingParagraphClearClassForMediaBlock = (block, options = {}) => {
  if (!(block instanceof HTMLElement) || !editor.contains(block)) return false;
  const { createIfMissing = false } = options;
  let changed = false;
  let paragraph = null;
  const nextSibling = block.nextElementSibling;

  if (isEditableTextBlock(nextSibling)) {
    paragraph = nextSibling;
  } else if (createIfMissing) {
    const ensured = ensureParagraphAfterMediaBlock(block, { forceClear: false });
    paragraph = ensured.paragraph;
    changed = ensured.changed;
  }

  if (!paragraph) return changed;
  const shouldClear = shouldForceClearAfterMediaBlock(block);
  const hasClearClass = paragraph.classList.contains("media-clear-paragraph");
  if (shouldClear && !hasClearClass) {
    paragraph.classList.add("media-clear-paragraph");
    changed = true;
  } else if (!shouldClear && hasClearClass) {
    paragraph.classList.remove("media-clear-paragraph");
    changed = true;
  }

  return changed;
};

const editorTopLevelChildForNode = (node) => {
  if (!editor) return null;
  let element = isElementNode(node) ? node : node && node.parentElement;
  while (element && element.parentElement !== editor) {
    if (element === editor) return null;
    element = element.parentElement;
  }
  return element && element.parentElement === editor ? element : null;
};

const isValidMediaDropAnchor = (node, draggedBlock) => {
  if (!(node instanceof HTMLElement)) return false;
  if (!editor.contains(node)) return false;
  if (node === draggedBlock) return false;
  if (node.classList.contains("page-assist")) return false;
  if (node.classList.contains("media-drop-indicator")) return false;
  return true;
};

const isSplittableDropTextBlock = (node) => {
  if (!(node instanceof HTMLElement)) return false;
  if (node.parentElement !== editor) return false;
  if (!node.matches("p, div, blockquote")) return false;
  if (!isEditableTextBlock(node)) return false;
  return true;
};

const isRangeWithinNode = (range, node) => {
  if (!(range instanceof Range) || !(node instanceof Node)) return false;
  const start = range.startContainer;
  return Boolean(start) && (start === node || node.contains(start));
};

const isRangeAtStartOfNode = (range, node) => {
  if (!(range instanceof Range) || !(node instanceof HTMLElement)) return false;
  try {
    const probe = document.createRange();
    probe.selectNodeContents(node);
    probe.collapse(true);
    return range.compareBoundaryPoints(Range.START_TO_START, probe) === 0;
  } catch {
    return false;
  }
};

const isRangeAtEndOfNode = (range, node) => {
  if (!(range instanceof Range) || !(node instanceof HTMLElement)) return false;
  try {
    const probe = document.createRange();
    probe.selectNodeContents(node);
    probe.collapse(false);
    return range.compareBoundaryPoints(Range.START_TO_END, probe) === 0;
  } catch {
    return false;
  }
};

const ensureTextBlockVisibleContent = (block) => {
  if (!(block instanceof HTMLElement)) return;
  const text = normalizeInlineText(block.textContent);
  const hasMeaningfulElementChild = Array.from(block.children).some((child) => child.tagName !== "BR");
  if (text.length === 0 && !hasMeaningfulElementChild) {
    block.innerHTML = "<br>";
  }
};

const cloneTextBlockShell = (sourceBlock) => {
  const clone = document.createElement(sourceBlock.tagName.toLowerCase());
  if (sourceBlock.className) {
    clone.className = sourceBlock.className;
  }
  const style = sourceBlock.getAttribute("style");
  if (style) {
    clone.setAttribute("style", style);
  }
  return clone;
};

const resolveTopLevelBlockInsertionRange = (range) => {
  if (!(range instanceof Range) || !editor) return range;
  const collapsed = range.cloneRange();
  collapsed.collapse(true);

  const topLevelBlock = editorTopLevelChildForNode(collapsed.startContainer);
  if (!(topLevelBlock instanceof HTMLElement) || topLevelBlock.parentElement !== editor) {
    return collapsed;
  }

  if (isSplittableDropTextBlock(topLevelBlock) && isRangeWithinNode(collapsed, topLevelBlock)) {
    const atStart = isRangeAtStartOfNode(collapsed, topLevelBlock);
    const atEnd = isRangeAtEndOfNode(collapsed, topLevelBlock);
    if (!atStart && !atEnd) {
      let beforeRange = null;
      let afterRange = null;
      try {
        beforeRange = document.createRange();
        beforeRange.selectNodeContents(topLevelBlock);
        beforeRange.setEnd(collapsed.startContainer, collapsed.startOffset);

        afterRange = document.createRange();
        afterRange.selectNodeContents(topLevelBlock);
        afterRange.setStart(collapsed.startContainer, collapsed.startOffset);
      } catch {
        return collapsed;
      }

      const beforeFragment = beforeRange.cloneContents();
      const afterFragment = afterRange.cloneContents();
      topLevelBlock.innerHTML = "";
      topLevelBlock.append(beforeFragment);
      ensureTextBlockVisibleContent(topLevelBlock);

      const trailingBlock = cloneTextBlockShell(topLevelBlock);
      trailingBlock.append(afterFragment);
      ensureTextBlockVisibleContent(trailingBlock);
      editor.insertBefore(trailingBlock, topLevelBlock.nextSibling);

      const insertRange = document.createRange();
      insertRange.setStartAfter(topLevelBlock);
      insertRange.collapse(true);
      return insertRange;
    }
  }

  const insertRange = document.createRange();
  if (isRangeAtStartOfNode(collapsed, topLevelBlock)) {
    insertRange.setStartBefore(topLevelBlock);
  } else {
    insertRange.setStartAfter(topLevelBlock);
  }
  insertRange.collapse(true);
  return insertRange;
};

const splitTextBlockForMediaDrop = (textBlock, range, mediaBlock) => {
  if (
    !editor ||
    !(textBlock instanceof HTMLElement) ||
    !(range instanceof Range) ||
    !(mediaBlock instanceof HTMLElement) ||
    !editor.contains(textBlock) ||
    !editor.contains(mediaBlock)
  ) {
    return false;
  }
  if (!isSplittableDropTextBlock(textBlock)) return false;
  if (!isRangeWithinNode(range, textBlock)) return false;

  const caretRange = range.cloneRange();
  caretRange.collapse(true);

  let beforeRange = null;
  let afterRange = null;
  try {
    beforeRange = document.createRange();
    beforeRange.selectNodeContents(textBlock);
    beforeRange.setEnd(caretRange.startContainer, caretRange.startOffset);

    afterRange = document.createRange();
    afterRange.selectNodeContents(textBlock);
    afterRange.setStart(caretRange.startContainer, caretRange.startOffset);
  } catch {
    return false;
  }

  const beforeFragment = beforeRange.cloneContents();
  const afterFragment = afterRange.cloneContents();

  textBlock.innerHTML = "";
  textBlock.append(beforeFragment);
  ensureTextBlockVisibleContent(textBlock);

  const trailingBlock = cloneTextBlockShell(textBlock);
  trailingBlock.append(afterFragment);
  ensureTextBlockVisibleContent(trailingBlock);

  editor.insertBefore(mediaBlock, textBlock.nextSibling);
  editor.insertBefore(trailingBlock, mediaBlock.nextSibling);
  return true;
};

const resolveMediaDropPlacement = (clientX, clientY, draggedBlock) => {
  if (!editor || !(draggedBlock instanceof HTMLElement) || !editor.contains(draggedBlock)) return null;

  let range = null;
  if (typeof document.caretRangeFromPoint === "function") {
    range = document.caretRangeFromPoint(clientX, clientY);
  } else if (typeof document.caretPositionFromPoint === "function") {
    const position = document.caretPositionFromPoint(clientX, clientY);
    if (position && position.offsetNode) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      range.collapse(true);
    }
  }

  if (range) {
    const anchor = editorTopLevelChildForNode(range.startContainer);
    if (isValidMediaDropAnchor(anchor, draggedBlock)) {
      if (isSplittableDropTextBlock(anchor) && isRangeWithinNode(range, anchor)) {
        const collapsedRange = range.cloneRange();
        collapsedRange.collapse(true);
        if (!isRangeAtStartOfNode(collapsedRange, anchor) && !isRangeAtEndOfNode(collapsedRange, anchor)) {
          return {
            type: "split",
            block: anchor,
            range: collapsedRange
          };
        }
        return {
          type: "flow",
          reference: anchor,
          after: isRangeAtEndOfNode(collapsedRange, anchor)
        };
      }
      const rect = anchor.getBoundingClientRect();
      return {
        type: "flow",
        reference: anchor,
        after: clientY > rect.top + rect.height * 0.5
      };
    }
  }

  const candidates = Array.from(editor.children).filter((child) => isValidMediaDropAnchor(child, draggedBlock));
  if (candidates.length === 0) {
    return { type: "flow", reference: null, after: false };
  }

  const editorRect = editor.getBoundingClientRect();
  if (clientY <= editorRect.top) {
    return { type: "flow", reference: candidates[0], after: false };
  }
  if (clientY >= editorRect.bottom) {
    return { type: "flow", reference: candidates[candidates.length - 1], after: true };
  }

  for (const candidate of candidates) {
    const rect = candidate.getBoundingClientRect();
    const middle = rect.top + rect.height * 0.5;
    if (clientY < middle) {
      return { type: "flow", reference: candidate, after: false };
    }
  }

  return { type: "flow", reference: candidates[candidates.length - 1], after: true };
};

const ensureMediaDropIndicator = () => {
  if (!(mediaDropIndicator instanceof HTMLElement) || !mediaDropIndicator.isConnected) {
    mediaDropIndicator = document.createElement("div");
    mediaDropIndicator.className = "media-drop-indicator";
    editor.append(mediaDropIndicator);
  }
  return mediaDropIndicator;
};

const showMediaDropIndicator = (placement, draggedBlock) => {
  if (!editor || !placement || !(draggedBlock instanceof HTMLElement)) return;
  const indicator = ensureMediaDropIndicator();
  const editorRect = editor.getBoundingClientRect();
  let topPx = 0;

  if (
    placement.type === "split" &&
    placement.range instanceof Range &&
    placement.block instanceof HTMLElement &&
    editor.contains(placement.block)
  ) {
    const caretRects = placement.range.getClientRects();
    const caretRect = caretRects.length > 0 ? caretRects[0] : placement.range.getBoundingClientRect();
    const blockRect = placement.block.getBoundingClientRect();
    if (caretRect && Number.isFinite(caretRect.top)) {
      const rawTop = caretRect.height > 0 ? caretRect.top : blockRect.top;
      const clampedTop = Math.max(blockRect.top, Math.min(blockRect.bottom, rawTop));
      topPx = clampedTop - editorRect.top + editor.scrollTop;
    } else {
      topPx = blockRect.top - editorRect.top + editor.scrollTop;
    }
  } else if (placement.reference instanceof HTMLElement && editor.contains(placement.reference)) {
    const refRect = placement.reference.getBoundingClientRect();
    topPx = (placement.after ? refRect.bottom : refRect.top) - editorRect.top + editor.scrollTop;
  } else {
    const flowChildren = Array.from(editor.children).filter((child) => isValidMediaDropAnchor(child, draggedBlock));
    if (flowChildren.length > 0) {
      const lastRect = flowChildren[flowChildren.length - 1].getBoundingClientRect();
      topPx = lastRect.bottom - editorRect.top + editor.scrollTop;
    }
  }

  indicator.style.top = `${Math.max(0, Math.round(topPx))}px`;
  indicator.style.left = "0";
  indicator.style.right = "0";
};

const clearMediaDropIndicator = () => {
  if (mediaDropIndicator && mediaDropIndicator.isConnected) {
    mediaDropIndicator.remove();
  }
  mediaDropIndicator = null;
};

const clearMediaDragState = () => {
  if (draggedMediaBlock && draggedMediaBlock.isConnected) {
    draggedMediaBlock.classList.remove("is-dragging-media");
  }
  draggedMediaBlock = null;
  mediaDropPlacement = null;
  clearMediaDropIndicator();
};

const isActiveDraggedMediaBlock = () => {
  return draggedMediaBlock instanceof HTMLElement && editor.contains(draggedMediaBlock);
};

const dragEventTargetsMediaStorage = (event) => {
  const target = event && event.target instanceof Element ? event.target : null;
  if (!(target instanceof Element)) return false;
  if (mediaStorageSidebar instanceof HTMLElement && mediaStorageSidebar.contains(target)) return true;
  if (mediaStorageList instanceof HTMLElement && mediaStorageList.contains(target)) return true;
  return false;
};

const isClientPointInsideEditor = (clientX, clientY) => {
  if (!editor) return false;
  const rect = editor.getBoundingClientRect();
  return clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom;
};

const updateMediaDragPlacementFromEvent = (event) => {
  if (!isActiveDraggedMediaBlock()) return false;
  if (dragEventTargetsMediaStorage(event)) return false;
  if (!isClientPointInsideEditor(event.clientX, event.clientY)) {
    mediaDropPlacement = null;
    clearMediaDropIndicator();
    return false;
  }
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "move";
  }
  const placement = resolveMediaDropPlacement(event.clientX, event.clientY, draggedMediaBlock);
  if (!placement) {
    mediaDropPlacement = null;
    clearMediaDropIndicator();
    return true;
  }
  mediaDropPlacement = placement;
  showMediaDropIndicator(placement, draggedMediaBlock);
  return true;
};

const finalizeMediaDragDropFromEvent = (event) => {
  if (!isActiveDraggedMediaBlock()) return false;
  if (dragEventTargetsMediaStorage(event)) return false;

  event.preventDefault();
  event.stopPropagation();

  if (isClientPointInsideEditor(event.clientX, event.clientY)) {
    const placement = resolveMediaDropPlacement(event.clientX, event.clientY, draggedMediaBlock) || mediaDropPlacement;
    moveMediaBlockToPlacement(draggedMediaBlock, placement);
  }

  clearMediaDragState();
  return true;
};

const syncAfterMediaBlockMove = (block) => {
  if (!(block instanceof HTMLElement)) return;
  if (block.classList.contains("graph-block") || block.classList.contains("image-block")) {
    syncGraphFigureNumbers();
  }
  if (block instanceof HTMLTableElement && !block.closest(".graph-block, .image-block")) {
    syncTableNumbers();
  }
};

const moveMediaBlockToPlacement = (block, placement) => {
  if (!editor || !(block instanceof HTMLElement) || !editor.contains(block)) return false;
  const resolvedPlacement = placement || resolveMediaDropPlacement(window.innerWidth * 0.5, window.innerHeight * 0.5, block);
  if (!resolvedPlacement) return false;

  if (
    resolvedPlacement.type === "split" &&
    resolvedPlacement.block instanceof HTMLElement &&
    resolvedPlacement.range instanceof Range
  ) {
    if (resolvedPlacement.block === block) return false;
    const moved = splitTextBlockForMediaDrop(resolvedPlacement.block, resolvedPlacement.range, block);
    if (!moved) return false;
    syncAfterMediaBlockMove(block);
    markDocumentChanged();
    return true;
  }

  const reference = resolvedPlacement.reference instanceof HTMLElement ? resolvedPlacement.reference : null;
  let insertBeforeNode = null;
  if (reference && editor.contains(reference)) {
    insertBeforeNode = resolvedPlacement.after ? reference.nextSibling : reference;
  }

  if (insertBeforeNode === block || block.nextSibling === insertBeforeNode) {
    return false;
  }
  if (!insertBeforeNode && block.nextSibling === null) {
    return false;
  }

  editor.insertBefore(block, insertBeforeNode);
  syncFollowingParagraphClearClassForMediaBlock(block, { createIfMissing: true });
  syncAfterMediaBlockMove(block);
  markDocumentChanged();
  return true;
};

const resolveSideClickMediaBlock = (clientX, clientY) => {
  if (!editor) return null;
  const editorRect = editor.getBoundingClientRect();
  if (clientX < editorRect.left || clientX > editorRect.right || clientY < editorRect.top || clientY > editorRect.bottom) {
    return null;
  }

  let best = null;
  let bestGap = Number.POSITIVE_INFINITY;
  const blocks = Array.from(editor.querySelectorAll(".image-block, .graph-block"));
  for (const block of blocks) {
    if (!(block instanceof HTMLElement)) continue;
    const rect = block.getBoundingClientRect();
    if (clientY < rect.top || clientY > rect.bottom) continue;
    if (clientX <= rect.right + 2) continue;
    const gap = clientX - rect.right;
    if (gap < bestGap) {
      bestGap = gap;
      best = block;
    }
  }
  return best;
};

const editableBlockFromPoint = (clientX, clientY) => {
  let range = null;
  if (typeof document.caretRangeFromPoint === "function") {
    range = document.caretRangeFromPoint(clientX, clientY);
  } else if (typeof document.caretPositionFromPoint === "function") {
    const position = document.caretPositionFromPoint(clientX, clientY);
    if (position && position.offsetNode) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      range.collapse(true);
    }
  }
  if (!range) return null;

  const container = range.startContainer;
  const element = isElementNode(container) ? container : container && container.parentElement;
  if (!(element instanceof Element) || !editor.contains(element)) return null;
  const block = element.closest("p, div, blockquote, li, h2, h3, h4, h5");
  if (!(block instanceof HTMLElement)) return null;
  if (block.closest(".graph-block, .image-block, .page-assist, .page-break-block")) return null;
  return block;
};

const clampClientYToFixedPageContent = (clientY) => {
  if (!pageSurface || normalizePageSize(metadataSettings.pageSize) === "endless") return null;
  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return null;

  const pageRect = pageSurface.getBoundingClientRect();
  if (!Number.isFinite(pageRect.top) || !Number.isFinite(pageRect.bottom) || pageRect.height <= 0) return null;
  if (clientY < pageRect.top || clientY > pageRect.bottom) return null;

  const computed = window.getComputedStyle(pageSurface);
  const pageTopPadding = Math.max(0, parseFloat(computed.paddingTop) || 0);
  const pageBottomPadding = Math.max(0, parseFloat(computed.paddingBottom) || 0);
  const relY = clientY - pageRect.top;
  const pageIndex = Math.max(0, Math.floor(relY / pageHeightPx));
  const contentTop = pageIndex * pageHeightPx + pageTopPadding;
  const contentBottom = (pageIndex + 1) * pageHeightPx - pageBottomPadding;

  if (relY >= contentTop && relY <= contentBottom) return null;

  const minY = Math.min(contentTop + 2, contentBottom);
  const maxY = Math.max(contentTop, contentBottom - 2);
  const clampedRelY = Math.max(minY, Math.min(maxY, relY));
  return pageRect.top + clampedRelY;
};

const resolveHeaderFooterMarginHit = (clientX, clientY) => {
  if (!pageSurface || normalizePageSize(metadataSettings.pageSize) === "endless") return null;
  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return null;

  const pageRect = pageSurface.getBoundingClientRect();
  if (
    !Number.isFinite(pageRect.left) ||
    !Number.isFinite(pageRect.right) ||
    !Number.isFinite(pageRect.top) ||
    !Number.isFinite(pageRect.bottom) ||
    pageRect.width <= 0 ||
    pageRect.height <= 0
  ) {
    return null;
  }
  if (clientX < pageRect.left || clientX > pageRect.right || clientY < pageRect.top || clientY > pageRect.bottom) {
    return null;
  }

  const computed = window.getComputedStyle(pageSurface);
  const pageTopPadding = Math.max(0, parseFloat(computed.paddingTop) || 0);
  const pageBottomPadding = Math.max(0, parseFloat(computed.paddingBottom) || 0);
  const relY = clientY - pageRect.top;
  const pageIndex = Math.max(0, Math.floor(relY / pageHeightPx));
  const yInPage = relY - pageIndex * pageHeightPx;
  const footerStartY = pageHeightPx - pageBottomPadding;

  if (yInPage <= pageTopPadding) {
    return { kind: "header", pageIndex };
  }
  if (yInPage >= footerStartY) {
    return { kind: "footer", pageIndex };
  }
  return null;
};

const selectStartOfNode = (node) => {
  if (!node) return;
  const selection = window.getSelection();
  if (!selection) return;

  const range = document.createRange();
  if (node.nodeType === Node.TEXT_NODE) {
    range.setStart(node, 0);
  } else {
    range.selectNodeContents(node);
  }
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
};

const sectionMetaForTag = (tagName) => {
  if (tagName === "h2") return { kind: "section", level: 1, typeLabel: "Section" };
  if (tagName === "h3") return { kind: "subsection", level: 2, typeLabel: "Subsection" };
  if (tagName === "h4") return { kind: "subsubsection", level: 3, typeLabel: "Subsubsection" };
  if (tagName === "h5") return { kind: "subtitle", level: 1, typeLabel: "Subtitle" };
  return { kind: "section", level: 1, typeLabel: "Section" };
};

const collectSectionEntries = () => {
  const entries = [];
  const titleText = titleField.textContent.replace(/\s+/g, " ").trim();
  entries.push({
    label: titleText || "Title",
    target: titleField,
    kind: "title",
    level: 0,
    typeLabel: "Title"
  });

  const counters = {
    section: 0,
    subsection: 0,
    subsubsection: 0,
    subtitle: 0
  };
  const headings = Array.from(editor.querySelectorAll("h2, h3, h4, h5"));
  headings.forEach((heading) => {
    const meta = sectionMetaForTag(heading.tagName.toLowerCase());
    counters[meta.kind] += 1;
    const headingText = heading.textContent.replace(/\s+/g, " ").trim();
    const fallbackLabel = `${meta.typeLabel} ${counters[meta.kind]}`;
    entries.push({
      label: headingText || fallbackLabel,
      target: heading,
      kind: meta.kind,
      level: meta.level,
      typeLabel: meta.typeLabel
    });
  });

  if (headings.length === 0) {
    const fallback = editor.querySelector("p, div, li, blockquote") || editor;
    entries.push({
      label: "Body",
      target: fallback,
      kind: "body",
      level: 1,
      typeLabel: "Body"
    });
  }

  return entries;
};

const detectActiveSectionIndex = (entries) => {
  const selectionNode = getSelectionNode();
  if (!selectionNode) return 0;
  const selectionElement = isElementNode(selectionNode) ? selectionNode : selectionNode.parentElement;
  if (!selectionElement) return 0;

  const exactIndex = entries.findIndex((entry) => entry.target.contains(selectionElement));
  if (exactIndex >= 0) return exactIndex;

  if (titleField.contains(selectionElement)) return 0;
  return Math.max(0, entries.length - 1);
};

const renderSectionFinder = () => {
  if (sectionEntries.length === 0) {
    sectionList.innerHTML = "";
    return;
  }

  sectionIndex = Math.max(0, Math.min(sectionEntries.length - 1, sectionIndex));
  sectionList.innerHTML = "";
  sectionEntries.forEach((entry, index) => {
    const item = document.createElement("div");
    item.className = "section-item";
    item.dataset.level = String(Math.max(0, Math.min(3, Number(entry.level) || 0)));

    const kind = document.createElement("span");
    kind.className = "section-item-kind";
    kind.textContent = entry.typeLabel || "Section";
    item.append(kind);

    const label = document.createElement("span");
    label.className = "section-item-label";
    label.textContent = entry.label;
    item.append(label);

    if (index === sectionIndex) {
      item.classList.add("is-selected");
    }
    sectionList.append(item);
  });

  const selected = sectionList.children[sectionIndex];
  if (selected) {
    selected.scrollIntoView({ block: "nearest" });
  }
};

const jumpToSection = (index) => {
  if (index < 0 || index >= sectionEntries.length) return;
  sectionIndex = index;
  const entry = sectionEntries[index];
  const target = entry.target;

  if (titleField.contains(target)) {
    titleField.focus({ preventScroll: true });
  } else {
    editor.focus({ preventScroll: true });
  }

  selectStartOfNode(target);
  target.scrollIntoView({ block: "center", inline: "nearest" });
  renderSectionFinder();
};

const openSectionFinder = () => {
  closeAllPanels();
  sectionEntries = collectSectionEntries();
  if (sectionEntries.length === 0) return;

  sectionIndex = detectActiveSectionIndex(sectionEntries);
  sectionFinderOpen = true;
  sectionFinder.classList.add("is-open");
  sectionFinder.setAttribute("aria-hidden", "false");
  renderSectionFinder();
};

const closeSectionFinder = () => {
  sectionFinderOpen = false;
  sectionFinder.classList.remove("is-open");
  sectionFinder.setAttribute("aria-hidden", "true");
};

const moveSectionSelection = (step) => {
  if (!sectionFinderOpen || sectionEntries.length === 0) return;
  const nextIndex = Math.max(0, Math.min(sectionEntries.length - 1, sectionIndex + step));
  if (nextIndex === sectionIndex) return;
  jumpToSection(nextIndex);
};

const clearTabHoldTimer = () => {
  if (!tabHoldTimer) return;
  clearTimeout(tabHoldTimer);
  tabHoldTimer = null;
};

const resetTabState = () => {
  clearTabHoldTimer();
  tabTapPending = false;
  tabTapOutdent = false;
  tabHeld = false;
};

const insertTextAtSelection = (text) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  const node = document.createTextNode(text);
  range.insertNode(node);
  const next = document.createRange();
  next.setStartAfter(node);
  next.collapse(true);
  selection.removeAllRanges();
  selection.addRange(next);
  return true;
};

const applyTabIndent = (isOutdent = false) => {
  ensureSelectionOnSurface();
  const selectionElement = getSelectionElement();
  if (!selectionElement) return;
  const inList = Boolean(selectionElement.closest("li"));

  if (inList) {
    document.execCommand(isOutdent ? "outdent" : "indent", false, null);
    markDocumentChanged();
    return;
  }

  if (isOutdent) {
    return;
  }

  const inserted = document.execCommand("insertText", false, "\t");
  if (!inserted) {
    insertTextAtSelection("\u00a0\u00a0\u00a0\u00a0");
  }
  markDocumentChanged();
};

const normalizeCitationFormat = (value) => {
  return CITATION_FORMATS.has(value) ? value : "MLA";
};

const normalizePageSize = (value) => {
  return PAGE_SIZES.has(value) ? value : "endless";
};

const normalizePageOrientation = (value) => {
  return PAGE_ORIENTATIONS.has(value) ? value : "portrait";
};

const normalizeMarginInches = (value, fallback = 1) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  const clamped = Math.min(MAX_PAGE_MARGIN_IN, Math.max(MIN_PAGE_MARGIN_IN, numeric));
  return Math.round(clamped * 100) / 100;
};

const normalizePageMargins = (value) => {
  const fallback = DEFAULT_PAGE_MARGINS_IN;
  const source = value && typeof value === "object" ? value : {};
  const uniformSource = source.all ?? source.uniform ?? source.margin;
  const uniform = Number.isFinite(Number(uniformSource))
    ? normalizeMarginInches(uniformSource, fallback.top)
    : null;

  if (uniform != null) {
    return {
      top: uniform,
      right: uniform,
      bottom: uniform,
      left: uniform
    };
  }

  return {
    top: normalizeMarginInches(source.top, fallback.top),
    right: normalizeMarginInches(source.right, fallback.right),
    bottom: normalizeMarginInches(source.bottom, fallback.bottom),
    left: normalizeMarginInches(source.left, fallback.left)
  };
};

const formatMarginInputValue = (value) => {
  const normalized = normalizeMarginInches(value, DEFAULT_PAGE_MARGINS_IN.top);
  return String(normalized).replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
};

const syncMarginInputs = (margins) => {
  const normalized = normalizePageMargins(margins);
  if (marginTopInput) marginTopInput.value = formatMarginInputValue(normalized.top);
  if (marginRightInput) marginRightInput.value = formatMarginInputValue(normalized.right);
  if (marginBottomInput) marginBottomInput.value = formatMarginInputValue(normalized.bottom);
  if (marginLeftInput) marginLeftInput.value = formatMarginInputValue(normalized.left);
};

const normalizeParagraphAlignment = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (raw === "start") return "left";
  if (raw === "end") return "right";
  if (raw === "justify-all") return "justify";
  return PARAGRAPH_ALIGNMENTS.has(raw) ? raw : "left";
};

const paragraphAlignmentFromNode = (node) => {
  if (!(node instanceof Element)) return "left";
  const candidates = [node.style.textAlign, node.getAttribute("align"), node.dataset.align];
  for (const candidate of candidates) {
    if (!candidate) continue;
    return normalizeParagraphAlignment(candidate);
  }
  return "left";
};

const getOrientedDimensions = (dimensions, orientation) => {
  if (orientation === "landscape") {
    return {
      width: dimensions.height,
      height: dimensions.width
    };
  }
  return dimensions;
};

const renderedScreenPageHeightPx = () => {
  if (!pageSurface) return 0;
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  if (pageSize === "endless") return 0;
  const orientation = normalizePageOrientation(metadataSettings.pageOrientation);
  const baseDimensions = SCREEN_PAGE_DIMENSIONS_IN[pageSize] || SCREEN_PAGE_DIMENSIONS_IN.Letter;
  const dimensions = getOrientedDimensions(baseDimensions, orientation);

  const baseWidthPx = Math.max(1, dimensions.width * 96);
  const baseHeightPx = Math.max(1, dimensions.height * 96);
  const renderedWidthPx = Math.max(1, pageSurface.clientWidth || baseWidthPx);
  const scale = renderedWidthPx / baseWidthPx;
  return Math.max(220, baseHeightPx * scale);
};

const countWords = (text) => {
  const normalized = String(text || "").replace(/\u00a0/g, " ").trim();
  if (!normalized) return 0;
  const matches = normalized.match(/\S+/g);
  return matches ? matches.length : 0;
};

const getDocumentWordCount = () => {
  const parts = [];
  if (titleField) {
    parts.push(titleField.textContent || "");
  }
  if (editor) {
    parts.push(editor.textContent || "");
  }
  if (citations.length > 0) {
    if (referencesHeading) {
      parts.push(referencesHeading.textContent || "");
    }
    if (referencesList) {
      parts.push(referencesList.textContent || "");
    }
  }
  return countWords(parts.join(" "));
};

const getSelectionAnchorRect = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const range = selection.getRangeAt(0).cloneRange();
  range.collapse(true);
  const rect = range.getClientRects()[0] || range.getBoundingClientRect();
  if (rect && (rect.width > 0 || rect.height > 0)) return rect;

  const anchor = selection.anchorNode;
  if (!anchor) return null;
  if (anchor.nodeType === Node.ELEMENT_NODE) {
    return anchor.getBoundingClientRect();
  }
  return anchor.parentElement ? anchor.parentElement.getBoundingClientRect() : null;
};

const captureViewportAnchorState = () => {
  const state = {
    scrollX: window.scrollX,
    scrollY: window.scrollY,
    selectionTop: null,
    activeTop: null
  };

  const selectionNode = getSelectionNode();
  if (pageSurface && selectionNode && pageSurface.contains(selectionNode)) {
    const rect = getSelectionAnchorRect();
    if (rect && Number.isFinite(rect.top)) {
      state.selectionTop = rect.top;
    }
  }

  const active = document.activeElement;
  if (pageSurface && active instanceof Element && pageSurface.contains(active)) {
    const rect = active.getBoundingClientRect();
    if (rect && Number.isFinite(rect.top)) {
      state.activeTop = rect.top;
    }
  }

  return state;
};

const restoreViewportAnchorState = (state) => {
  if (!state || !Number.isFinite(state.scrollY)) return;

  let desiredY = state.scrollY;
  let anchored = false;
  const selectionNode = getSelectionNode();
  if (state.selectionTop != null && pageSurface && selectionNode && pageSurface.contains(selectionNode)) {
    const rect = getSelectionAnchorRect();
    if (rect && Number.isFinite(rect.top)) {
      desiredY += rect.top - state.selectionTop;
      anchored = true;
    }
  }

  if (!anchored && state.activeTop != null) {
    const active = document.activeElement;
    if (pageSurface && active instanceof Element && pageSurface.contains(active)) {
      const rect = active.getBoundingClientRect();
      if (rect && Number.isFinite(rect.top)) {
        desiredY += rect.top - state.activeTop;
        anchored = true;
      }
    }
  }

  const scroller = document.scrollingElement || document.documentElement || document.body;
  const maxY = Math.max(0, (scroller ? scroller.scrollHeight : 0) - window.innerHeight);
  const clampedY = Math.max(0, Math.min(maxY, desiredY));
  if (Math.abs(window.scrollY - clampedY) > 0.5 || Math.abs(window.scrollX - state.scrollX) > 0.5) {
    window.scrollTo({
      left: state.scrollX,
      top: clampedY,
      behavior: "auto"
    });
  }
};

const currentPageFromViewportOrSelection = (totalPages) => {
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  if (pageSize === "endless") return 1;
  if (!pageSurface || totalPages <= 1) return 1;

  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return 1;

  const pageRect = pageSurface.getBoundingClientRect();
  const selectionNode = getSelectionNode();
  const selectionInsideSurface = selectionNode ? pageSurface.contains(selectionNode) : false;
  const anchorRect = getSelectionAnchorRect();

  let relativeY;
  if (selectionInsideSurface && anchorRect) {
    relativeY = anchorRect.top - pageRect.top;
  } else {
    relativeY = window.innerHeight * 0.5 - pageRect.top;
  }

  const clampedY = Math.max(0, Math.min(pageRect.height - 1, relativeY));
  const page = Math.floor(clampedY / pageHeightPx) + 1;
  return Math.max(1, Math.min(totalPages, page));
};

const updateWindowStatus = (includeWords = true) => {
  if (!windowStatus || !wordCountStatus || !pageCountStatus) return;

  const totalPages = Math.max(1, Number.isFinite(renderedPageCount) ? Math.round(renderedPageCount) : 1);
  const currentPage = currentPageFromViewportOrSelection(totalPages);
  pageCountStatus.textContent = `Page ${currentPage} of ${totalPages}`;

  if (includeWords) {
    wordCountStatus.textContent = `Words: ${getDocumentWordCount()}`;
  }
};

const scheduleWindowStatus = (includeWords = false) => {
  statusNeedsWordRefresh = statusNeedsWordRefresh || Boolean(includeWords);
  if (statusSyncFrame) return;
  statusSyncFrame = window.requestAnimationFrame(() => {
    statusSyncFrame = 0;
    updateWindowStatus(statusNeedsWordRefresh);
    statusNeedsWordRefresh = false;
  });
};

const scheduleWordCountRefresh = () => {
  if (wordCountRefreshTimer) {
    clearTimeout(wordCountRefreshTimer);
  }
  wordCountRefreshTimer = setTimeout(() => {
    wordCountRefreshTimer = null;
    scheduleWindowStatus(true);
  }, WORD_COUNT_REFRESH_DELAY_MS);
};

const closePageCornerMenu = () => {
  if (openPageCornerMenu && openPageCornerMenu.isConnected) {
    openPageCornerMenu.classList.remove("is-open");
    openPageCornerMenu.classList.remove("is-page-number-submenu-open");
  }
  openPageCornerMenu = null;
};

const PAGE_FLOW_INLINE_SENTINEL = "__none__";
const PAGE_FLOW_ATTR_SELECTOR =
  "[data-page-flow-inline-margin-top], [data-page-flow-base-margin-top], [data-page-flow-gap], [data-page-flow-managed]";
const PAGE_FLOW_SPLIT_ATTR_SELECTOR =
  "[data-page-flow-split-root], [data-page-flow-split-continuation], [data-page-flow-split-inline-margin-bottom]";

const isFlowAdjustableBlock = (element) => {
  if (!(element instanceof HTMLElement)) return false;
  if (element.classList.contains("page-assist")) {
    const kind = String(element.dataset.pageKind || "");
    return kind !== "header" && kind !== "footer" && kind !== "page-number";
  }
  return true;
};

const MAX_REASONABLE_INLINE_TEXT_MARGIN_PX = 72;

const isNaturalTextFlowBlock = (element) => {
  if (!(element instanceof HTMLElement)) return false;
  if (isEditableTextBlock(element)) return true;
  return element.matches("li, h2, h3, h4, h5, ul, ol");
};

const parseInlineMarginPixels = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  if (!raw) return null;
  if (raw === "auto") return null;
  const numeric = parseFloat(raw);
  return Number.isFinite(numeric) ? numeric : null;
};

const normalizeRunawayInlineSpacingForBlock = (block) => {
  if (!(block instanceof HTMLElement) || !isNaturalTextFlowBlock(block)) return false;
  let changed = false;
  const marginTop = parseInlineMarginPixels(block.style.marginTop);
  const marginBottom = parseInlineMarginPixels(block.style.marginBottom);

  if (marginTop != null && Math.abs(marginTop) > MAX_REASONABLE_INLINE_TEXT_MARGIN_PX) {
    block.style.removeProperty("margin-top");
    changed = true;
  }
  if (marginBottom != null && Math.abs(marginBottom) > MAX_REASONABLE_INLINE_TEXT_MARGIN_PX) {
    block.style.removeProperty("margin-bottom");
    changed = true;
  }

  if (changed) {
    delete block.dataset.pageFlowInlineMarginTop;
    delete block.dataset.pageFlowBaseMarginTop;
    delete block.dataset.pageFlowGap;
    delete block.dataset.pageFlowManaged;
  }
  return changed;
};

const normalizeRunawayInlineSpacingInEditor = () => {
  if (!editor) return false;
  let changed = false;
  const children = Array.from(editor.children);
  children.forEach((child) => {
    if (normalizeRunawayInlineSpacingForBlock(child)) {
      changed = true;
    }
  });
  return changed;
};

const restoreOriginalMarginTopForFlowBlock = (element) => {
  if (!(element instanceof HTMLElement)) return;
  const inline = element.dataset.pageFlowInlineMarginTop;
  if (inline === PAGE_FLOW_INLINE_SENTINEL || typeof inline === "undefined") {
    element.style.removeProperty("margin-top");
  } else {
    element.style.marginTop = inline;
  }
};

const restoreOriginalMarginBottomForSplitBlock = (element) => {
  if (!(element instanceof HTMLElement)) return;
  const inline = element.dataset.pageFlowSplitInlineMarginBottom;
  if (inline === PAGE_FLOW_INLINE_SENTINEL || typeof inline === "undefined") {
    element.style.removeProperty("margin-bottom");
  } else {
    element.style.marginBottom = inline;
  }
};

const clearTransientPageFlowAttrsFromElement = (element, restoreOriginalMargin = true) => {
  if (!(element instanceof HTMLElement)) return;
  if (restoreOriginalMargin) {
    const inline = element.dataset.pageFlowInlineMarginTop;
    if (inline === PAGE_FLOW_INLINE_SENTINEL) {
      element.style.removeProperty("margin-top");
    } else if (typeof inline === "string") {
      element.style.marginTop = inline;
    } else if (element.dataset.pageFlowManaged === "true") {
      element.style.removeProperty("margin-top");
    }
  }
  delete element.dataset.pageFlowInlineMarginTop;
  delete element.dataset.pageFlowBaseMarginTop;
  delete element.dataset.pageFlowGap;
  delete element.dataset.pageFlowManaged;
};

const mergeTransientPageFlowSplits = (root, restoreOriginalMargin = true) => {
  if (!(root instanceof Element)) return;

  const splitRoots = [];
  if (root instanceof HTMLElement && root.dataset.pageFlowSplitRoot && root.dataset.pageFlowSplitContinuation !== "true") {
    splitRoots.push(root);
  }
  root
    .querySelectorAll("[data-page-flow-split-root]:not([data-page-flow-split-continuation='true'])")
    .forEach((node) => splitRoots.push(node));

  splitRoots.forEach((rootBlock) => {
    if (!(rootBlock instanceof HTMLElement)) return;
    const splitRootId = String(rootBlock.dataset.pageFlowSplitRoot || "").trim();
    if (!splitRootId) return;

    let cursor = rootBlock.nextElementSibling;
    while (
      cursor instanceof HTMLElement &&
      cursor.dataset.pageFlowSplitRoot === splitRootId &&
      cursor.dataset.pageFlowSplitContinuation === "true"
    ) {
      const next = cursor.nextElementSibling;
      while (cursor.firstChild) {
        rootBlock.append(cursor.firstChild);
      }
      cursor.remove();
      cursor = next;
    }

    if (restoreOriginalMargin) {
      restoreOriginalMarginBottomForSplitBlock(rootBlock);
    }
    delete rootBlock.dataset.pageFlowSplitRoot;
    delete rootBlock.dataset.pageFlowSplitInlineMarginBottom;
    delete rootBlock.dataset.pageFlowSplitContinuation;
  });

  const orphanedContinuations = [];
  if (root instanceof HTMLElement && root.dataset.pageFlowSplitContinuation === "true") {
    orphanedContinuations.push(root);
  }
  root.querySelectorAll("[data-page-flow-split-continuation='true']").forEach((node) => orphanedContinuations.push(node));
  orphanedContinuations.forEach((node) => {
    if (!(node instanceof HTMLElement)) return;
    if (restoreOriginalMargin) {
      restoreOriginalMarginBottomForSplitBlock(node);
    }
    delete node.dataset.pageFlowSplitRoot;
    delete node.dataset.pageFlowSplitInlineMarginBottom;
    delete node.dataset.pageFlowSplitContinuation;
  });
};

const stripTransientPageFlowState = (root, restoreOriginalMargin = true) => {
  if (!(root instanceof Element)) return;
  const targets = [];
  if (root.matches(PAGE_FLOW_ATTR_SELECTOR)) {
    targets.push(root);
  }
  root.querySelectorAll(PAGE_FLOW_ATTR_SELECTOR).forEach((node) => targets.push(node));

  targets.forEach((element) => {
    if (!(element instanceof HTMLElement)) return;
    clearTransientPageFlowAttrsFromElement(element, restoreOriginalMargin);
  });

  mergeTransientPageFlowSplits(root, restoreOriginalMargin);
};

const getFixedPageFlowMetrics = (pageHeightPx) => {
  if (!pageSurface || !editor || !Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return null;

  const computed = window.getComputedStyle(pageSurface);
  const pageTopPadding = Math.max(0, parseFloat(computed.paddingTop) || 0);
  const pageBottomPadding = Math.max(0, parseFloat(computed.paddingBottom) || 0);
  const contentEndOffset = Math.max(pageTopPadding, pageHeightPx - pageBottomPadding);
  const pageRect = pageSurface.getBoundingClientRect();
  const editorRect = editor.getBoundingClientRect();
  const editorOffsetRaw = editorRect.top - pageRect.top;
  const editorOffsetFromPageTop = Number.isFinite(editorOffsetRaw) ? editorOffsetRaw : 0;
  const contentHeight = Math.max(0, contentEndOffset - pageTopPadding);

  return {
    pageHeightPx,
    pageTopPadding,
    pageBottomPadding,
    contentEndOffset,
    editorOffsetFromPageTop,
    contentHeight,
    resolvePageIndexForTop(topInEditor) {
      const normalized = (topInEditor + editorOffsetFromPageTop - pageTopPadding) / pageHeightPx;
      if (!Number.isFinite(normalized)) return 0;
      return Math.max(0, Math.floor(normalized));
    },
    pageContentStartForIndex(pageIndex) {
      return pageIndex * pageHeightPx + pageTopPadding - editorOffsetFromPageTop;
    },
    pageContentEndForIndex(pageIndex) {
      return pageIndex * pageHeightPx + contentEndOffset - editorOffsetFromPageTop;
    }
  };
};

const isSplittablePageFlowTextBlock = (block) => {
  if (!(block instanceof HTMLElement)) return false;
  if (block.parentElement !== editor) return false;
  if (!block.matches("p, div, blockquote")) return false;
  if (!isEditableTextBlock(block)) return false;
  if (normalizeInlineText(block.textContent).length <= PAGE_FLOW_SPLIT_MIN_OFFSET * 2) return false;

  const nestedBlocks = block.querySelector(
    "p, div, blockquote, h2, h3, h4, h5, ul, ol, li, table, .graph-block, .image-block, .page-assist, .page-break-block"
  );
  return !nestedBlocks;
};

const collectTextNodeEntries = (block) => {
  const walker = document.createTreeWalker(block, NodeFilter.SHOW_TEXT);
  const entries = [];
  let start = 0;
  while (walker.nextNode()) {
    const node = walker.currentNode;
    const value = String(node.nodeValue || "");
    if (!value) continue;
    const end = start + value.length;
    entries.push({ node, start, end, value });
    start = end;
  }
  return { entries, totalLength: start, text: entries.map((entry) => entry.value).join("") };
};

const resolveTextNodePositionAtOffset = (entries, offset) => {
  const target = Math.max(0, Number(offset) || 0);
  for (const entry of entries) {
    if (target < entry.end) {
      return {
        node: entry.node,
        offset: Math.max(0, target - entry.start)
      };
    }
  }

  const last = entries[entries.length - 1];
  if (!last) return null;
  return {
    node: last.node,
    offset: last.value.length
  };
};

const bottomOfRange = (range) => {
  if (!(range instanceof Range)) return null;
  const rects = range.getClientRects();
  if (rects.length > 0) {
    return rects[rects.length - 1].bottom;
  }
  const rect = range.getBoundingClientRect();
  if (rect && Number.isFinite(rect.bottom)) return rect.bottom;
  return null;
};

const findSplitOffsetForTextBlock = (block, maxBottom) => {
  const { entries, totalLength, text } = collectTextNodeEntries(block);
  if (entries.length === 0 || totalLength <= PAGE_FLOW_SPLIT_MIN_OFFSET * 2) return null;

  const measurableRange = document.createRange();
  measurableRange.selectNodeContents(block);
  let low = PAGE_FLOW_SPLIT_MIN_OFFSET;
  let high = totalLength - PAGE_FLOW_SPLIT_MIN_OFFSET;
  let best = null;

  while (low <= high) {
    const mid = Math.floor((low + high) / 2);
    const position = resolveTextNodePositionAtOffset(entries, mid);
    if (!position || !position.node) {
      high = mid - 1;
      continue;
    }

    measurableRange.setEnd(position.node, position.offset);
    const bottom = bottomOfRange(measurableRange);
    if (bottom != null && bottom <= maxBottom) {
      best = mid;
      low = mid + 1;
    } else {
      high = mid - 1;
    }
  }

  if (!Number.isFinite(best)) return null;
  let candidate = Math.max(PAGE_FLOW_SPLIT_MIN_OFFSET, Math.min(totalLength - PAGE_FLOW_SPLIT_MIN_OFFSET, best));
  while (candidate > PAGE_FLOW_SPLIT_MIN_OFFSET && !/\s/.test(text.charAt(candidate - 1))) {
    candidate -= 1;
  }
  while (candidate < totalLength - PAGE_FLOW_SPLIT_MIN_OFFSET && /\s/.test(text.charAt(candidate))) {
    candidate += 1;
  }
  if (candidate <= PAGE_FLOW_SPLIT_MIN_OFFSET || candidate >= totalLength - PAGE_FLOW_SPLIT_MIN_OFFSET) {
    candidate = best;
  }
  if (candidate <= PAGE_FLOW_SPLIT_MIN_OFFSET || candidate >= totalLength - PAGE_FLOW_SPLIT_MIN_OFFSET) {
    return null;
  }
  return candidate;
};

const splitOverflowingTextBlocksAcrossPages = (metrics) => {
  if (!editor || !metrics || !Number.isFinite(metrics.contentHeight) || metrics.contentHeight <= 0) return false;

  const blocks = Array.from(editor.children);
  let changed = false;

  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (!(block instanceof HTMLElement) || !isSplittablePageFlowTextBlock(block)) continue;

    const top = block.offsetTop;
    const height = Math.max(0, block.offsetHeight || 0);
    if (height <= metrics.contentHeight + 0.5) continue;

    const pageIndex = metrics.resolvePageIndexForTop(top);
    const pageContentEnd = metrics.pageContentEndForIndex(pageIndex);
    const overflowsBottom = top + height > pageContentEnd + 0.5;
    if (!overflowsBottom) continue;

    const splitOffset = findSplitOffsetForTextBlock(block, pageContentEnd - 4);
    if (!Number.isFinite(splitOffset)) continue;

    const splitRootId = block.dataset.pageFlowSplitRoot || `page-flow-split-${++pageFlowSplitCounter}`;
    const wasContinuation = block.dataset.pageFlowSplitContinuation === "true";
    const originalInlineMarginBottom =
      block.dataset.pageFlowSplitInlineMarginBottom || block.style.marginBottom || PAGE_FLOW_INLINE_SENTINEL;
    block.dataset.pageFlowSplitRoot = splitRootId;
    block.dataset.pageFlowSplitInlineMarginBottom = originalInlineMarginBottom;
    if (!wasContinuation) {
      delete block.dataset.pageFlowSplitContinuation;
    }

    const { entries } = collectTextNodeEntries(block);
    const startPosition = resolveTextNodePositionAtOffset(entries, splitOffset);
    if (!startPosition || !startPosition.node) continue;

    const tailRange = document.createRange();
    tailRange.selectNodeContents(block);
    tailRange.setStart(startPosition.node, startPosition.offset);
    const fragment = tailRange.extractContents();
    if (!fragment || !fragment.hasChildNodes()) continue;

    const nextBlock = block.cloneNode(false);
    if (!(nextBlock instanceof HTMLElement)) {
      block.append(fragment);
      continue;
    }

    clearTransientPageFlowAttrsFromElement(nextBlock, true);
    nextBlock.dataset.pageFlowSplitRoot = splitRootId;
    nextBlock.dataset.pageFlowSplitContinuation = "true";
    nextBlock.dataset.pageFlowSplitInlineMarginBottom = originalInlineMarginBottom;
    nextBlock.style.marginTop = "0px";
    restoreOriginalMarginBottomForSplitBlock(nextBlock);
    nextBlock.append(fragment);

    if (
      normalizeInlineText(block.textContent).length <= PAGE_FLOW_SPLIT_MIN_OFFSET ||
      normalizeInlineText(nextBlock.textContent).length <= PAGE_FLOW_SPLIT_MIN_OFFSET
    ) {
      while (nextBlock.firstChild) {
        block.append(nextBlock.firstChild);
      }
      restoreOriginalMarginBottomForSplitBlock(block);
      if (!wasContinuation) {
        delete block.dataset.pageFlowSplitRoot;
        delete block.dataset.pageFlowSplitInlineMarginBottom;
      }
      continue;
    }

    block.style.marginBottom = "0px";
    editor.insertBefore(nextBlock, block.nextSibling);
    blocks.splice(index + 1, 0, nextBlock);
    changed = true;
  }

  return changed;
};

const shouldUseRelaxedTypingPageGuideDelay = (block, inputType) => {
  if (!pageSurface || normalizePageSize(metadataSettings.pageSize) === "endless") return false;
  if (!(block instanceof HTMLElement) || !isNaturalTextFlowBlock(block)) return false;
  if (!inputType || (!inputType.startsWith("insert") && !inputType.startsWith("delete"))) return false;
  if (block.dataset.pageFlowSplitRoot) return false;

  const pageHeightPx = renderedScreenPageHeightPx();
  const metrics = getFixedPageFlowMetrics(pageHeightPx);
  if (!metrics || metrics.contentHeight <= 0) return false;

  const top = block.offsetTop;
  const height = Math.max(0, block.offsetHeight || 0);
  const pageIndex = metrics.resolvePageIndexForTop(top);
  const pageContentStart = metrics.pageContentStartForIndex(pageIndex);
  const pageContentEnd = metrics.pageContentEndForIndex(pageIndex);
  const topGap = top - pageContentStart;
  const bottomGap = pageContentEnd - (top + height);
  if (topGap <= PAGE_FLOW_RELAXED_BOUNDARY_THRESHOLD_PX) return false;
  if (bottomGap <= PAGE_FLOW_RELAXED_BOUNDARY_THRESHOLD_PX) return false;
  if (height >= metrics.contentHeight - PAGE_FLOW_RELAXED_BOUNDARY_THRESHOLD_PX) return false;
  return true;
};

const cloneNormalizedEditorRoot = () => {
  if (!(editor instanceof HTMLElement)) return null;
  const clone = editor.cloneNode(true);
  if (!(clone instanceof HTMLElement)) return null;
  stripTransientPageFlowState(clone, true);
  pruneEmptySectionHeadings(clone);
  return clone;
};

const getPersistableEditorHtml = () => {
  if (!(editor instanceof HTMLElement)) return "<p><br></p>";
  const clone = cloneNormalizedEditorRoot();
  if (!(clone instanceof HTMLElement)) return editor.innerHTML;
  return clone.innerHTML;
};

const syncEditorPageFlowAdjustments = (pageHeightPx) => {
  const metrics = getFixedPageFlowMetrics(pageHeightPx);
  if (!metrics) {
    stripTransientPageFlowState(editor, true);
    return false;
  }

  const { resolvePageIndexForTop, pageContentStartForIndex, pageContentEndForIndex, contentHeight } = metrics;
  const blocks = Array.from(editor.children).filter((node) => isFlowAdjustableBlock(node));
  if (blocks.length === 0) {
    stripTransientPageFlowState(editor, true);
    return false;
  }

  const previousFlowState = new Map();
  let changed = false;
  blocks.forEach((block) => {
    if (!(block instanceof HTMLElement)) return;
    if (normalizeRunawayInlineSpacingForBlock(block)) {
      changed = true;
    }
    if (typeof block.dataset.pageFlowInlineMarginTop === "undefined") {
      block.dataset.pageFlowInlineMarginTop = block.style.marginTop || PAGE_FLOW_INLINE_SENTINEL;
    }
    const prevGap = parseFloat(block.dataset.pageFlowGap || "0");
    previousFlowState.set(block, {
      managed: block.dataset.pageFlowManaged === "true",
      gap: Number.isFinite(prevGap) ? prevGap : 0
    });
    restoreOriginalMarginTopForFlowBlock(block);
    const baseMarginTop = parseFloat(window.getComputedStyle(block).marginTop) || 0;
    block.dataset.pageFlowBaseMarginTop = String(baseMarginTop);
    delete block.dataset.pageFlowGap;
    delete block.dataset.pageFlowManaged;
  });

  let forceNextContentTop = null;
  for (const block of blocks) {
    if (!(block instanceof HTMLElement)) continue;
    const top = block.offsetTop;
    let desiredTop = top;

    if (Number.isFinite(forceNextContentTop) && desiredTop < forceNextContentTop) {
      desiredTop = forceNextContentTop;
    }

    let pageIndex = resolvePageIndexForTop(desiredTop);
    const pageContentStart = pageContentStartForIndex(pageIndex);
    const pageContentEnd = pageContentEndForIndex(pageIndex);
    const isPageBreak = block.classList.contains("page-break-block");
    const blockHeight = Math.max(0, block.offsetHeight || 0);

    if (!isPageBreak && desiredTop < pageContentStart - 0.5) {
      desiredTop = pageContentStart;
    }

    if (!isPageBreak) {
      const overflowsContentBottom = desiredTop + blockHeight > pageContentEnd + 0.5;
      const canShiftToNextPage = desiredTop > pageContentStart + 0.5;
      if (overflowsContentBottom && canShiftToNextPage) {
        pageIndex += 1;
        desiredTop = pageContentStartForIndex(pageIndex);
      } else if (desiredTop > pageContentEnd + 0.5) {
        pageIndex += 1;
        desiredTop = pageContentStartForIndex(pageIndex);
      }
    }

    const gap = Math.max(0, desiredTop - top);
    const previous = previousFlowState.get(block) || { managed: false, gap: 0 };
    if (gap > 0.5) {
      const baseMarginTop = Number(block.dataset.pageFlowBaseMarginTop || 0);
      const nextMarginTop = baseMarginTop + gap;
      block.style.marginTop = `${nextMarginTop}px`;
      block.dataset.pageFlowGap = String(Math.round(gap));
      block.dataset.pageFlowManaged = "true";
      if (!previous.managed || Math.abs(previous.gap - gap) > 0.5) {
        changed = true;
      }
    } else if (previous.managed) {
      changed = true;
    }

    const effectiveTop = block.offsetTop;
    if (isPageBreak) {
      const breakPage = resolvePageIndexForTop(effectiveTop);
      forceNextContentTop = pageContentStartForIndex(breakPage + 1);
    } else if (Number.isFinite(forceNextContentTop) && effectiveTop >= forceNextContentTop - 0.5) {
      forceNextContentTop = null;
    }
  }

  // Hard clamp pass: if any block still straddles a page boundary, push it to the next page start.
  // This keeps each page's editable flow bounded by margins with no cross-page overlap.
  for (const block of blocks) {
    if (!(block instanceof HTMLElement) || block.classList.contains("page-break-block")) continue;

    const currentTop = block.offsetTop;
    const blockHeight = Math.max(0, block.offsetHeight || 0);
    if (blockHeight <= 0) continue;

    const pageIndex = resolvePageIndexForTop(currentTop);
    const pageContentStart = pageContentStartForIndex(pageIndex);
    const pageContentEnd = pageContentEndForIndex(pageIndex);
    const isTooTallForSinglePage = blockHeight > contentHeight + 0.5;
    const startsAtPageTop = currentTop <= pageContentStart + 0.5;
    const overflowsBottom = currentTop + blockHeight > pageContentEnd + 0.5;
    const underflowsTop = currentTop < pageContentStart - 0.5;

    if (!underflowsTop && !overflowsBottom) continue;
    if (isTooTallForSinglePage && startsAtPageTop && overflowsBottom) {
      // Degenerate case: block cannot fit on one page; avoid endless cascading.
      continue;
    }

    const targetTop = underflowsTop ? pageContentStart : pageContentStartForIndex(pageIndex + 1);
    const extraGap = Math.max(0, targetTop - currentTop);
    if (extraGap <= 0.5) continue;

    const currentMarginTop = parseFloat(window.getComputedStyle(block).marginTop) || 0;
    block.style.marginTop = `${currentMarginTop + extraGap}px`;
    block.dataset.pageFlowManaged = "true";
    const baseMarginTop = Number(block.dataset.pageFlowBaseMarginTop || 0);
    block.dataset.pageFlowGap = String(Math.max(0, Math.round(currentMarginTop + extraGap - baseMarginTop)));
    changed = true;
  }

  return changed;
};

const focusEditableBlock = (node) => {
  if (!(node instanceof HTMLElement)) return;
  editor.focus({ preventScroll: true });
  const selection = window.getSelection();
  if (!selection) return;
  const range = document.createRange();
  range.selectNodeContents(node);
  selection.removeAllRanges();
  selection.addRange(range);
};

const resolveAssistPlaceholder = (kind) => {
  if (kind === "header") return "Header";
  if (kind === "footer") return "Footer";
  if (kind === "page-number") return "Page number";
  return "Page note";
};

const normalizePageNumberPosition = (value, fallback = "bottom") => {
  const raw = String(value || "").trim().toLowerCase();
  if (PAGE_NUMBER_POSITIONS.has(raw)) return raw;
  const normalizedFallback = String(fallback || "").trim().toLowerCase();
  return PAGE_NUMBER_POSITIONS.has(normalizedFallback) ? normalizedFallback : "bottom";
};

const normalizePageAssistKind = (assist) => {
  if (!(assist instanceof HTMLElement)) return "note";
  const rawKind = String(assist.dataset.pageKind || "").trim().toLowerCase();
  if (rawKind === "header" || rawKind === "footer" || rawKind === "note" || rawKind === "page-number") return rawKind;
  return "note";
};

const resolvePageAssistBoundaryKind = (assist) => {
  const kind = normalizePageAssistKind(assist);
  if (kind === "page-number") {
    const position = normalizePageNumberPosition(assist instanceof HTMLElement ? assist.dataset.pageNumberPosition : "");
    return position === "top" ? "header" : "footer";
  }
  return kind;
};

const pageAssistSelector = (kind, pageNumber, options = {}) => {
  const normalizedKind = PAGE_ASSIST_KINDS.has(kind) ? kind : "note";
  const normalizedPageNumber = Math.max(1, Number(pageNumber) || 1);
  let selector = `.page-assist[data-page-kind="${normalizedKind}"][data-page-index="${normalizedPageNumber}"]`;
  if (normalizedKind === "page-number") {
    const position = normalizePageNumberPosition(options.pageNumberPosition, "bottom");
    selector += `[data-page-number-position="${position}"]`;
  }
  return selector;
};

const normalizePageAssistPageNumber = (assist) => {
  if (!(assist instanceof HTMLElement)) return 1;
  const raw = Number(assist.dataset.pageIndex || "1");
  if (!Number.isFinite(raw)) return 1;
  if (raw <= 0) return 1;
  return Math.max(1, Math.floor(raw));
};

const splitLegacyPageNumberAssists = () => {
  if (!editor) return false;
  let changed = false;
  const legacyAssists = Array.from(editor.querySelectorAll(".page-assist[data-page-number-auto='true']"));

  legacyAssists.forEach((assist) => {
    if (!(assist instanceof HTMLElement)) return;
    const kind = normalizePageAssistKind(assist);
    if (kind !== "header" && kind !== "footer") return;

    const pageNumber = normalizePageAssistPageNumber(assist);
    const position = kind === "header" ? "top" : "bottom";
    const align = normalizeParagraphAlignment(assist.dataset.align || assist.style.textAlign || "right");
    const format = normalizePageNumberFormat(
      assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(assist.textContent || "")
    );
    const selector = pageAssistSelector("page-number", pageNumber, { pageNumberPosition: position });
    let pageNumberAssist = editor.querySelector(selector);
    if (!(pageNumberAssist instanceof HTMLElement)) {
      pageNumberAssist = document.createElement("div");
      pageNumberAssist.className = "page-assist";
      pageNumberAssist.dataset.pageAssist = "true";
      pageNumberAssist.dataset.pageKind = "page-number";
      pageNumberAssist.dataset.pageNumberPosition = position;
      pageNumberAssist.dataset.pageIndex = String(pageNumber);
      pageNumberAssist.dataset.placeholder = resolveAssistPlaceholder("page-number");
      pageNumberAssist.setAttribute("aria-label", `${resolveAssistPlaceholder("page-number")} for page ${pageNumber}`);
      if (position === "top") {
        editor.insertBefore(pageNumberAssist, assist);
      } else {
        editor.insertBefore(pageNumberAssist, assist.nextSibling);
      }
      changed = true;
    }

    const expectedText = pageNumberAssistText(pageNumber, format);
    if (String(pageNumberAssist.textContent || "").trim() !== expectedText) {
      pageNumberAssist.textContent = expectedText;
      changed = true;
    }
    if (pageNumberAssist.dataset.pageNumberAuto !== "true") {
      pageNumberAssist.dataset.pageNumberAuto = "true";
      changed = true;
    }
    if ("pageNumberManual" in pageNumberAssist.dataset) {
      delete pageNumberAssist.dataset.pageNumberManual;
      changed = true;
    }
    if (pageNumberAssist.dataset.pageNumberFormat !== format) {
      pageNumberAssist.dataset.pageNumberFormat = format;
      changed = true;
    }
    if (pageNumberAssist.dataset.pageNumberPosition !== position) {
      pageNumberAssist.dataset.pageNumberPosition = position;
      changed = true;
    }
    if (normalizeParagraphAlignment(pageNumberAssist.dataset.align || pageNumberAssist.style.textAlign || "right") !== align) {
      pageNumberAssist.dataset.align = align;
      pageNumberAssist.style.textAlign = align;
      changed = true;
    }
    const nextRepeatAuto = assist.dataset.pageRepeatAuto === "true" ? "true" : "false";
    if (pageNumberAssist.dataset.pageRepeatAuto !== nextRepeatAuto) {
      pageNumberAssist.dataset.pageRepeatAuto = nextRepeatAuto;
      changed = true;
    }
    if (assist.dataset.pageRepeatManual === "true") {
      if (pageNumberAssist.dataset.pageRepeatManual !== "true") {
        pageNumberAssist.dataset.pageRepeatManual = "true";
        changed = true;
      }
    } else if ("pageRepeatManual" in pageNumberAssist.dataset) {
      delete pageNumberAssist.dataset.pageRepeatManual;
      changed = true;
    }

    if (stripPageNumberTokenFromAssist(assist, { format })) {
      changed = true;
    }
    if ("pageNumberAuto" in assist.dataset) {
      delete assist.dataset.pageNumberAuto;
      changed = true;
    }
    if ("pageNumberFormat" in assist.dataset) {
      delete assist.dataset.pageNumberFormat;
      changed = true;
    }
  });

  return changed;
};

const editorPageIndexForTopLevelBlock = (block, pageHeightPx, pageRect) => {
  if (!(block instanceof HTMLElement) || !Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return null;
  if (block.classList.contains("page-assist")) {
    return normalizePageAssistPageNumber(block);
  }
  const rect = block.getBoundingClientRect();
  if (!Number.isFinite(rect.top) || !Number.isFinite(pageRect.top)) return null;
  const topInPage = rect.top - pageRect.top;
  const probe = topInPage + Math.max(0, rect.height) * 0.25;
  const pageIndex = Math.floor(Math.max(0, probe) / pageHeightPx) + 1;
  return Math.max(1, pageIndex);
};

const previousEditorTopLevelBlock = (block) => {
  if (!(block instanceof HTMLElement) || !editor) return null;
  let previous = block.previousElementSibling;
  while (previous instanceof HTMLElement && previous.classList.contains("media-drop-indicator")) {
    previous = previous.previousElementSibling;
  }
  return previous instanceof HTMLElement && previous.parentElement === editor ? previous : null;
};

const setCaretAfterTopLevelNode = (node) => {
  if (!(node instanceof HTMLElement) || !editor || !editor.contains(node)) return false;
  editor.focus({ preventScroll: true });
  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const isLiftableTopLevelBlockChild = (node) => {
  if (!(node instanceof HTMLElement)) return false;
  if (node.classList.contains("graph-block") || node.classList.contains("image-block")) return true;
  if (node.classList.contains("page-break-block")) return true;
  return node.matches("table, h2, h3, h4, h5, p, div, blockquote, figure");
};

const normalizeEditorTopLevelBlockStructure = () => {
  if (!(editor instanceof HTMLElement)) return false;
  let changed = false;
  const wrappers = Array.from(editor.children).filter(
    (child) => child instanceof HTMLElement && child.matches("p, div, blockquote")
  );

  wrappers.forEach((wrapper) => {
    if (!(wrapper instanceof HTMLElement) || wrapper.parentElement !== editor) return;
    const liftableChildren = Array.from(wrapper.children).filter((child) => isLiftableTopLevelBlockChild(child));
    if (liftableChildren.length === 0) return;

    const hasComplexInlineContent = Array.from(wrapper.childNodes).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return normalizeInlineText(node.nodeValue).length > 0;
      }
      if (!(node instanceof HTMLElement)) return false;
      if (liftableChildren.includes(node)) return false;
      if (node.tagName === "BR") return false;
      return normalizeInlineText(node.textContent).length > 0 || node.children.length > 0;
    });
    if (hasComplexInlineContent) return;

    let insertAfter = wrapper;
    liftableChildren.forEach((child) => {
      if (!(child instanceof HTMLElement)) return;
      editor.insertBefore(child, insertAfter.nextSibling);
      insertAfter = child;
      changed = true;
    });

    const hasRemainingContent = Array.from(wrapper.childNodes).some((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        return normalizeInlineText(node.nodeValue).length > 0;
      }
      if (!(node instanceof HTMLElement)) return false;
      if (node.tagName === "BR") return false;
      return true;
    });
    if (!hasRemainingContent) {
      wrapper.remove();
      changed = true;
    }
  });

  return changed;
};

const isTextualTopLevelBlock = (block) => {
  if (!(block instanceof HTMLElement)) return false;
  if (block.classList.contains("page-assist")) return false;
  if (block.classList.contains("page-break-block")) return false;
  if (block.classList.contains("graph-block") || block.classList.contains("image-block")) return false;
  return block.matches("p, div, blockquote, li, h2, h3, h4, h5, ul, ol") || block.isContentEditable;
};

const handleBackspaceAcrossPages = () => {
  if (!editor || !pageSurface) return false;
  if (normalizePageSize(metadataSettings.pageSize) === "endless") return false;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return false;
  const anchorNode = selection.anchorNode;
  if (!anchorNode || !editor.contains(anchorNode)) return false;

  const currentBlock = editorTopLevelChildForNode(anchorNode);
  if (!(currentBlock instanceof HTMLElement)) return false;

  const collapsed = selection.getRangeAt(0).cloneRange();
  collapsed.collapse(true);
  if (!isRangeAtStartOfNode(collapsed, currentBlock)) return false;

  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return false;
  const pageRect = pageSurface.getBoundingClientRect();
  const currentPage = editorPageIndexForTopLevelBlock(currentBlock, pageHeightPx, pageRect);

  let compareBlock = previousEditorTopLevelBlock(currentBlock);
  while (compareBlock instanceof HTMLElement && compareBlock.classList.contains("page-assist")) {
    compareBlock = previousEditorTopLevelBlock(compareBlock);
  }
  if (!(compareBlock instanceof HTMLElement)) return false;

  const previousPage = editorPageIndexForTopLevelBlock(compareBlock, pageHeightPx, pageRect);
  if (!Number.isFinite(currentPage) || !Number.isFinite(previousPage) || currentPage === previousPage) {
    return false;
  }

  let cursor = compareBlock;
  while (cursor instanceof HTMLElement) {
    if (cursor.classList.contains("page-assist")) {
      cursor = previousEditorTopLevelBlock(cursor);
      continue;
    }
    if (cursor.classList.contains("page-break-block")) {
      const beforeBreak = previousEditorTopLevelBlock(cursor);
      cursor.remove();
      markDocumentChanged();
      if (beforeBreak instanceof HTMLElement) {
        cursor = beforeBreak;
        continue;
      }
      focusEditorAtEnd();
      return true;
    }
    if (cursor.classList.contains("graph-block") || cursor.classList.contains("image-block")) {
      return setCaretAfterTopLevelNode(cursor);
    }
    if (isTextualTopLevelBlock(cursor)) {
      return focusEditableTargetAtEnd(cursor);
    }
    cursor = previousEditorTopLevelBlock(cursor);
  }

  focusEditorAtEnd();
  return true;
};

const normalizePageAssistBlocks = () => {
  if (!editor) return false;
  let changed = false;
  if (splitLegacyPageNumberAssists()) {
    changed = true;
  }
  const assists = Array.from(editor.querySelectorAll(".page-assist"));
  const hasZeroBasedLegacyPageAssist = assists.some((assist) => {
    if (!(assist instanceof HTMLElement)) return false;
    const rawKind = String(assist.dataset.pageKind || "").trim().toLowerCase();
    if (rawKind !== "page-number") return false;
    const rawIndex = Number(assist.dataset.pageIndex || "1");
    return Number.isFinite(rawIndex) && rawIndex === 0;
  });
  assists.forEach((assist) => {
    if (!(assist instanceof HTMLElement)) return;
    const rawKind = String(assist.dataset.pageKind || "").trim().toLowerCase();

    const normalizedKind = normalizePageAssistKind(assist);
    if (assist.dataset.pageKind !== normalizedKind) {
      assist.dataset.pageKind = normalizedKind;
      changed = true;
    }

    let pageNumber = normalizePageAssistPageNumber(assist);
    if (rawKind === "page-number" && hasZeroBasedLegacyPageAssist) {
      pageNumber = Math.max(1, pageNumber + 1);
    }
    if (assist.dataset.pageIndex !== String(pageNumber)) {
      assist.dataset.pageIndex = String(pageNumber);
      changed = true;
    }

    if (normalizedKind === "page-number") {
      const normalizedPosition = normalizePageNumberPosition(
        assist.dataset.pageNumberPosition,
        rawKind === "header" ? "top" : "bottom"
      );
      if (assist.dataset.pageNumberPosition !== normalizedPosition) {
        assist.dataset.pageNumberPosition = normalizedPosition;
        changed = true;
      }
    } else if ("pageNumberPosition" in assist.dataset) {
      delete assist.dataset.pageNumberPosition;
      changed = true;
    }

    const shouldAutoNumber =
      String(assist.dataset.pageNumberAuto || "") === "true" ||
      (rawKind === "page-number" && assist.dataset.pageNumberManual !== "true" && !("pageNumberAuto" in assist.dataset));
    if (shouldAutoNumber) {
      if (assist.dataset.pageNumberAuto !== "true") {
        assist.dataset.pageNumberAuto = "true";
        changed = true;
      }
      if ("pageNumberManual" in assist.dataset) {
        delete assist.dataset.pageNumberManual;
        changed = true;
      }
      const detectedFormat = normalizePageNumberFormat(
        assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(assist.textContent || "")
      );
      if (assist.dataset.pageNumberFormat !== detectedFormat) {
        assist.dataset.pageNumberFormat = detectedFormat;
        changed = true;
      }
      if (normalizedKind === "page-number" && pageNumber >= 2 && assist.dataset.pageRepeatManual !== "true") {
        if (assist.dataset.pageRepeatAuto !== "true") {
          assist.dataset.pageRepeatAuto = "true";
          changed = true;
        }
      }
    }

    const align = normalizeParagraphAlignment(assist.dataset.align || assist.style.textAlign || "right");
    if (normalizeParagraphAlignment(assist.dataset.align || "right") !== align) {
      assist.dataset.align = align;
      changed = true;
    }
    if (normalizeParagraphAlignment(assist.style.textAlign || "right") !== align) {
      assist.style.textAlign = align;
      changed = true;
    }

    const placeholder = resolveAssistPlaceholder(normalizedKind);
    if (assist.dataset.placeholder !== placeholder) {
      assist.dataset.placeholder = placeholder;
      changed = true;
    }
    const expectedLabel = `${placeholder} for page ${pageNumber}`;
    if (assist.getAttribute("aria-label") !== expectedLabel) {
      assist.setAttribute("aria-label", expectedLabel);
      changed = true;
    }

    if (normalizedKind === "page-number" && assist.dataset.pageNumberAuto === "true") {
      const expectedText = pageNumberAssistText(
        pageNumber,
        normalizePageNumberFormat(assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(assist.textContent || ""))
      );
      if (String(assist.textContent || "").replace(/\s+/g, " ").trim() !== expectedText) {
        assist.textContent = expectedText;
        changed = true;
      }
    }
  });
  return changed;
};

const PAGE_NUMBER_FORMATS = new Set(["page", "number"]);
const PAGE_NUMBER_TOKEN_PATTERN = /\bpage\s+\d+\b/i;
const TRAILING_NUMBER_TOKEN_PATTERN = /(^|[\s\u00a0])\d+\s*$/;

const normalizePageNumberFormat = (value) => {
  const raw = String(value || "").trim().toLowerCase();
  return PAGE_NUMBER_FORMATS.has(raw) ? raw : "page";
};

const inferPageNumberFormatFromText = (value) => {
  const text = String(value || "").replace(/\u00a0/g, " ").trim();
  if (!text) return "page";
  if (PAGE_NUMBER_TOKEN_PATTERN.test(text)) return "page";
  if (TRAILING_NUMBER_TOKEN_PATTERN.test(text)) return "number";
  return "page";
};

const pageNumberAssistText = (pageNumber, format = "page") => {
  const normalizedFormat = normalizePageNumberFormat(format);
  return normalizedFormat === "number" ? `${pageNumber}` : `Page ${pageNumber}`;
};

const applyPageNumberTokenToText = (value, pageNumber, format = "page", options = {}) => {
  const source = String(value || "");
  const normalizedFormat = normalizePageNumberFormat(format);
  const replacement = pageNumberAssistText(pageNumber, normalizedFormat);
  const replaceTrailingNumber = options.replaceTrailingNumber === true;
  if (PAGE_NUMBER_TOKEN_PATTERN.test(source)) {
    return source.replace(PAGE_NUMBER_TOKEN_PATTERN, replacement);
  }
  if (replaceTrailingNumber && TRAILING_NUMBER_TOKEN_PATTERN.test(source)) {
    return source.replace(TRAILING_NUMBER_TOKEN_PATTERN, (_match, prefix) => `${prefix}${replacement}`);
  }
  return `${source.trim()} ${replacement}`.trim();
};

const stripPageNumberTokenFromAssist = (assist, options = {}) => {
  if (!(assist instanceof HTMLElement)) return false;
  const resolvedFormat = normalizePageNumberFormat(
    options.format || assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(assist.textContent || "")
  );
  const textNodes = [];
  const walker = document.createTreeWalker(assist, NodeFilter.SHOW_TEXT);

  while (walker.nextNode()) {
    const current = walker.currentNode;
    if (current && typeof current.nodeValue === "string" && current.nodeValue) {
      textNodes.push(current);
    }
  }

  let changed = false;
  textNodes.forEach((textNode) => {
    const source = textNode.nodeValue || "";
    let replaced = source.replace(/\bpage\s+\d+\b/gi, " ");
    if (resolvedFormat === "number") {
      replaced = replaced.replace(/(^|[\s\u00a0])\d+\s*$/g, "$1");
    }
    replaced = replaced.replace(/[ \t]{2,}/g, " ");
    if (replaced !== source) {
      textNode.nodeValue = replaced;
      changed = true;
    }
  });

  if (changed && !hasMeaningfulPageAssistNode(assist)) {
    assist.innerHTML = "";
  }
  return changed;
};

const normalizePageAssistText = (value) => {
  return String(value || "")
    .replace(/\u200b/g, "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
};

const hasMeaningfulPageAssistNode = (node) => {
  if (!node) return false;
  if (node.nodeType === Node.TEXT_NODE) {
    return normalizePageAssistText(node.nodeValue).length > 0;
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return false;

  const element = node;
  const tag = element.tagName;
  if (tag === "BR" || tag === "WBR") return false;
  if (tag === "IMG" || tag === "SVG" || tag === "MATH" || tag === "CANVAS" || tag === "VIDEO" || tag === "AUDIO") {
    return true;
  }

  for (const child of element.childNodes) {
    if (hasMeaningfulPageAssistNode(child)) return true;
  }
  return false;
};

const isPageAssistContentEmpty = (assist) => {
  if (!(assist instanceof HTMLElement)) return true;
  return !hasMeaningfulPageAssistNode(assist);
};

const syncPageAssistVisibility = (assist) => {
  if (!(assist instanceof HTMLElement)) return false;
  const kind = String(assist.dataset.pageKind || "").toLowerCase();
  const isHeaderOrFooter = kind === "header" || kind === "footer" || kind === "page-number";

  if (!isHeaderOrFooter) {
    if (assist.dataset.pageContentEmpty === "true") {
      delete assist.dataset.pageContentEmpty;
      return true;
    }
    return false;
  }

  const empty = isPageAssistContentEmpty(assist);
  const isEditing = document.activeElement === assist || isSelectionInsideNode(assist);
  const shouldHide = empty && !isEditing;
  const currentlyHidden = assist.dataset.pageContentEmpty === "true";
  if (shouldHide === currentlyHidden) return false;

  if (shouldHide) {
    assist.dataset.pageContentEmpty = "true";
  } else {
    delete assist.dataset.pageContentEmpty;
  }
  return true;
};

const syncAllPageAssistVisibility = () => {
  if (!editor) return false;
  let changed = false;
  const assists = Array.from(editor.querySelectorAll(".page-assist"));
  assists.forEach((assist) => {
    if (syncPageAssistVisibility(assist)) changed = true;
  });
  return changed;
};

const clearPositionedPageAssist = (assist) => {
  if (!(assist instanceof HTMLElement)) return;
  assist.style.removeProperty("position");
  assist.style.removeProperty("top");
  assist.style.removeProperty("left");
  assist.style.removeProperty("right");
  assist.style.removeProperty("width");
  assist.style.removeProperty("margin");
  assist.style.removeProperty("z-index");
  delete assist.dataset.pageAssistPositioned;
};

const clearPositionedPageAssists = () => {
  if (!editor) return;
  const assists = Array.from(editor.querySelectorAll(".page-assist[data-page-assist-positioned='true']"));
  assists.forEach((assist) => clearPositionedPageAssist(assist));
};

const syncFixedPageAssistPlacement = (pageHeightPx) => {
  if (!editor || !pageSurface || !Number.isFinite(pageHeightPx) || pageHeightPx <= 0) {
    clearPositionedPageAssists();
    return false;
  }

  const computed = window.getComputedStyle(pageSurface);
  const pageTopPadding = Math.max(0, parseFloat(computed.paddingTop) || 0);
  const pageLeftPadding = Math.max(0, parseFloat(computed.paddingLeft) || 0);
  const pageRightPadding = Math.max(0, parseFloat(computed.paddingRight) || 0);
  const pageBottomPadding = Math.max(0, parseFloat(computed.paddingBottom) || 0);
  const pageRect = pageSurface.getBoundingClientRect();
  const editorRect = editor.getBoundingClientRect();
  const editorOffsetFromPageTop = editorRect.top - pageRect.top;
  const headerOffset = Math.max(2, Math.round(Math.min(Math.max(2, pageTopPadding - 2), pageTopPadding * 0.42)));
  const footerOffset = Math.max(2, Math.round(Math.min(Math.max(2, pageBottomPadding - 2), pageBottomPadding * 0.42)));
  const autoPageNumberOffset = (padding) => {
    if (!Number.isFinite(padding) || padding <= 0) return 2;
    const desired = Math.round(padding * 0.1);
    const clamped = Math.max(4, Math.min(12, desired));
    const paddingBound = Math.max(2, Math.round(padding - 1));
    return Math.max(2, Math.min(paddingBound, clamped));
  };
  const autoPageNumberInset = (padding) => {
    if (!Number.isFinite(padding) || padding <= 1) return 0;
    const desired = Math.round(padding * 0.12);
    const clamped = Math.max(2, Math.min(12, desired));
    const paddingBound = Math.max(0, Math.round(padding - 1));
    return Math.max(0, Math.min(paddingBound, clamped));
  };
  const positioned = new Set();
  const pageSlots = new Map();
  let changed = false;

  const registerPageAssist = (pageIndex) => {
    if (!pageSlots.has(pageIndex)) {
      pageSlots.set(pageIndex, {
        header: null,
        footer: null,
        topPageNumber: null,
        bottomPageNumber: null
      });
    }
    return pageSlots.get(pageIndex);
  };

  const assistLayoutMetrics = (assist, kind) => {
    const align = normalizeParagraphAlignment(assist.dataset.align || assist.style.textAlign || "right");
    let leftInset = 0;
    let rightInset = 0;
    if (kind === "page-number") {
      leftInset = autoPageNumberInset(pageLeftPadding);
      rightInset = autoPageNumberInset(pageRightPadding);
      if (align === "center") {
        const symmetricInset = Math.min(leftInset, rightInset);
        leftInset = symmetricInset;
        rightInset = symmetricInset;
      }
    }
    return {
      assist,
      kind,
      align,
      leftInset,
      rightInset,
      height: Math.max(PAGE_ASSIST_MIN_HEIGHT_PX, assist.offsetHeight || 0)
    };
  };

  const applyPositionedAssist = (entry, desiredTopInPage) => {
    if (!entry || !(entry.assist instanceof HTMLElement)) return;
    const desiredTopInEditor = desiredTopInPage - editorOffsetFromPageTop;
    const nextTop = `${Math.round(desiredTopInEditor)}px`;
    const nextLeft = `${Math.round(-pageLeftPadding + entry.leftInset)}px`;
    const nextRight = `${Math.round(-pageRightPadding + entry.rightInset)}px`;
    if (
      entry.assist.dataset.pageAssistPositioned !== "true" ||
      entry.assist.style.position !== "absolute" ||
      entry.assist.style.top !== nextTop ||
      entry.assist.style.left !== nextLeft ||
      entry.assist.style.right !== nextRight ||
      entry.assist.style.width !== "auto" ||
      entry.assist.style.margin !== "0px" ||
      entry.assist.style.zIndex !== "6"
    ) {
      entry.assist.style.position = "absolute";
      entry.assist.style.top = nextTop;
      entry.assist.style.left = nextLeft;
      entry.assist.style.right = nextRight;
      entry.assist.style.width = "auto";
      entry.assist.style.margin = "0";
      entry.assist.style.zIndex = "6";
      entry.assist.dataset.pageAssistPositioned = "true";
      changed = true;
    }
    if (normalizeParagraphAlignment(entry.assist.style.textAlign || entry.assist.dataset.align || "right") !== entry.align) {
      entry.assist.style.textAlign = entry.align;
      changed = true;
    }
    positioned.add(entry.assist);
  };

  const assists = Array.from(editor.querySelectorAll(".page-assist"));
  assists.forEach((assist) => {
    if (!(assist instanceof HTMLElement)) return;
    if (syncPageAssistVisibility(assist)) {
      changed = true;
    }
    if (assist.dataset.pageContentEmpty === "true") {
      clearPositionedPageAssist(assist);
      return;
    }
    const kind = normalizePageAssistKind(assist);
    if (kind !== "header" && kind !== "footer" && kind !== "page-number") return;
    const pageIndex = Math.max(0, Number(assist.dataset.pageIndex || "1") - 1);
    const slot = registerPageAssist(pageIndex);
    const metrics = assistLayoutMetrics(assist, kind);
    if (kind === "page-number") {
      const position = normalizePageNumberPosition(assist.dataset.pageNumberPosition, "bottom");
      if (position === "top") {
        slot.topPageNumber = metrics;
      } else {
        slot.bottomPageNumber = metrics;
      }
      return;
    }
    if (kind === "header") {
      slot.header = metrics;
      return;
    }
    slot.footer = metrics;
  });

  pageSlots.forEach((slot, pageIndex) => {
    const pageTop = pageIndex * pageHeightPx;

    let topCursor = pageTop;
    if (slot.topPageNumber) {
      const topNumberTop = pageTop + autoPageNumberOffset(pageTopPadding);
      applyPositionedAssist(slot.topPageNumber, topNumberTop);
      topCursor = topNumberTop + slot.topPageNumber.height + PAGE_ASSIST_VERTICAL_GAP_PX;
    }
    if (slot.header) {
      const headerTop = Math.max(pageTop + headerOffset, topCursor);
      applyPositionedAssist(slot.header, headerTop);
    }

    let bottomCursor = pageTop + pageHeightPx;
    if (slot.bottomPageNumber) {
      const bottomNumberTop =
        pageTop + pageHeightPx - autoPageNumberOffset(pageBottomPadding) - slot.bottomPageNumber.height;
      applyPositionedAssist(slot.bottomPageNumber, bottomNumberTop);
      bottomCursor = bottomNumberTop - PAGE_ASSIST_VERTICAL_GAP_PX;
    }
    if (slot.footer) {
      const footerBaseTop = pageTop + pageHeightPx - footerOffset - slot.footer.height;
      const footerTop = Math.min(footerBaseTop, bottomCursor - slot.footer.height);
      applyPositionedAssist(slot.footer, footerTop);
    }
  });

  const stale = Array.from(editor.querySelectorAll(".page-assist[data-page-assist-positioned='true']"));
  stale.forEach((assist) => {
    if (positioned.has(assist)) return;
    clearPositionedPageAssist(assist);
    changed = true;
  });

  return changed;
};

const clearReferencesOwnPageOffset = () => {
  if (!referencesSection) return;
  referencesSection.style.removeProperty("--references-page-gap");
  referencesSection.classList.remove("is-own-page");
};

const syncReferencesOwnPageOffset = (pageHeightPx) => {
  if (!referencesSection) return;
  const isFixedPage = normalizePageSize(metadataSettings.pageSize) !== "endless";
  if (!isFixedPage || citations.length === 0 || !Number.isFinite(pageHeightPx) || pageHeightPx <= 0) {
    clearReferencesOwnPageOffset();
    return;
  }

  const editorBottom = editor ? editor.offsetTop + editor.offsetHeight : 0;
  const naturalTop = editorBottom + REFERENCES_BASE_MARGIN_PX;
  const computed = pageSurface ? window.getComputedStyle(pageSurface) : null;
  const pageTopPadding = computed ? Math.max(0, parseFloat(computed.paddingTop) || 0) : 0;
  const relativeTop = Math.max(0, naturalTop - pageTopPadding);
  const currentPageIndex = Math.floor(relativeTop / pageHeightPx);
  const nextPageContentTop = (currentPageIndex + 1) * pageHeightPx + pageTopPadding;
  const extraGap = Math.max(0, nextPageContentTop - naturalTop);
  referencesSection.style.setProperty("--references-page-gap", `${Math.round(extraGap)}px`);
  referencesSection.classList.add("is-own-page");
};

const locatePageFlowAnchors = (pageIndex, pageHeightPx) => {
  if (!pageSurface) {
    return { firstInPage: null, lastInPage: null, firstAfterPage: null };
  }

  const pageRect = pageSurface.getBoundingClientRect();
  const startY = pageIndex * pageHeightPx;
  const endY = startY + pageHeightPx;
  let firstInPage = null;
  let lastInPage = null;
  let firstAfterPage = null;

  const children = Array.from(editor.children);
  for (const child of children) {
    if (!(child instanceof HTMLElement)) continue;
    const rect = child.getBoundingClientRect();
    const top = rect.top - pageRect.top;
    const bottom = rect.bottom - pageRect.top;

    if (bottom >= startY && top < endY) {
      if (!firstInPage) firstInPage = child;
      lastInPage = child;
    }
    if (!firstAfterPage && top >= endY) {
      firstAfterPage = child;
    }
  }

  return { firstInPage, lastInPage, firstAfterPage };
};

const createPageAssistBlock = (kind, pageNumber, options = {}) => {
  const block = document.createElement("div");
  block.className = "page-assist";
  block.dataset.pageAssist = "true";
  block.dataset.pageKind = kind;
  block.dataset.pageIndex = String(pageNumber);
  block.dataset.align = "right";
  block.dataset.placeholder = resolveAssistPlaceholder(kind);
  block.dataset.pageRepeatAuto = "false";
  block.style.textAlign = "right";
  block.setAttribute("aria-label", `${resolveAssistPlaceholder(kind)} for page ${pageNumber}`);
  if (kind === "page-number") {
    block.dataset.pageNumberPosition = normalizePageNumberPosition(options.pageNumberPosition, "bottom");
  }
  return block;
};

const insertPageAssistForPage = (kind, pageIndex, options = {}) => {
  if (!PAGE_ASSIST_KINDS.has(kind)) return null;
  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) return null;

  const {
    focus = true,
    scroll = focus,
    markDirty = true,
    initialText = "",
    markAsPageNumber = false,
    repeatAuto = false,
    align = null,
    pageNumberPosition = "bottom"
  } = options;
  const normalizedAlign = align ? normalizeParagraphAlignment(align) : null;
  const normalizedPageNumberPosition = normalizePageNumberPosition(pageNumberPosition, "bottom");

  const pageNumber = Math.max(1, Math.floor(pageIndex) + 1);
  const pageKey = String(pageNumber);
  const existing = editor.querySelector(pageAssistSelector(kind, pageKey, { pageNumberPosition: normalizedPageNumberPosition }));
  if (existing instanceof HTMLElement) {
    let changed = false;
    if (initialText && !String(existing.textContent || "").trim()) {
      existing.textContent = initialText;
      changed = true;
    }
    if (markAsPageNumber) {
      existing.dataset.pageNumberAuto = "true";
      changed = true;
    }
    if (normalizedAlign && normalizeParagraphAlignment(existing.dataset.align || existing.style.textAlign) !== normalizedAlign) {
      existing.dataset.align = normalizedAlign;
      existing.style.textAlign = normalizedAlign;
      changed = true;
    }
    if (repeatAuto) {
      existing.dataset.pageRepeatAuto = "true";
      delete existing.dataset.pageRepeatManual;
      changed = true;
    }
    if (kind === "page-number" && existing.dataset.pageNumberPosition !== normalizedPageNumberPosition) {
      existing.dataset.pageNumberPosition = normalizedPageNumberPosition;
      changed = true;
    }
    if (focus && isPageAssistContentEmpty(existing)) {
      delete existing.dataset.pageContentEmpty;
    }
    if (scroll) {
      existing.scrollIntoView({ block: "center", inline: "nearest" });
    }
    if (focus) {
      focusEditableBlock(existing);
    }
    const visibilityChanged = syncPageAssistVisibility(existing);
    if (markDirty && changed) {
      markDocumentChanged();
    } else if (visibilityChanged) {
      scheduleAutoPageBreakGuides();
    }
    return existing;
  }

  const block = createPageAssistBlock(kind, pageNumber, { pageNumberPosition: normalizedPageNumberPosition });
  if (initialText) {
    block.textContent = initialText;
  }
  if (markAsPageNumber) {
    block.dataset.pageNumberAuto = "true";
  }
  if (normalizedAlign) {
    block.dataset.align = normalizedAlign;
    block.style.textAlign = normalizedAlign;
  }
  if (repeatAuto) {
    block.dataset.pageRepeatAuto = "true";
    delete block.dataset.pageRepeatManual;
  }
  const { firstInPage, lastInPage, firstAfterPage } = locatePageFlowAnchors(pageIndex, pageHeightPx);
  const insertAtTop = kind === "header" || (kind === "page-number" && normalizedPageNumberPosition === "top");

  if (insertAtTop) {
    if (firstInPage) {
      editor.insertBefore(block, firstInPage);
    } else if (firstAfterPage) {
      editor.insertBefore(block, firstAfterPage);
    } else {
      editor.append(block);
    }
  } else if (lastInPage && lastInPage.nextSibling) {
    editor.insertBefore(block, lastInPage.nextSibling);
  } else if (lastInPage) {
    editor.append(block);
  } else if (firstAfterPage) {
    editor.insertBefore(block, firstAfterPage);
  } else {
    editor.append(block);
  }

  if (scroll) {
    block.scrollIntoView({ block: "center", inline: "nearest" });
  }
  if (focus) {
    focusEditableBlock(block);
  }
  const visibilityChanged = syncPageAssistVisibility(block);
  if (markDirty) {
    markDocumentChanged();
  } else if (visibilityChanged) {
    scheduleAutoPageBreakGuides();
  }
  return block;
};

const insertPageNumberAssistForPage = (pageIndex, options = {}) => {
  const position = options.position === "bottom" ? "bottom" : "top";
  const align = normalizeParagraphAlignment(options.align || "right");
  const format = normalizePageNumberFormat(options.format || "page");
  const pageNumber = Math.max(1, Math.floor(pageIndex) + 1);
  const pageNumberText = pageNumberAssistText(pageNumber, format);
  const assist = insertPageAssistForPage("page-number", pageIndex, {
    focus: true,
    markDirty: false,
    initialText: pageNumberText,
    markAsPageNumber: true,
    align,
    pageNumberPosition: position
  });
  if (!(assist instanceof HTMLElement)) return;

  const current = String(assist.textContent || "").replace(/\s+/g, " ").trim();
  const previousFormat = normalizePageNumberFormat(
    assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(current)
  );
  const replaceTrailingNumber = assist.dataset.pageNumberAuto === "true" && previousFormat === "number";
  assist.textContent = applyPageNumberTokenToText(current, pageNumber, format, { replaceTrailingNumber });
  assist.dataset.pageNumberAuto = "true";
  assist.dataset.pageNumberFormat = format;
  assist.dataset.pageNumberPosition = position;
  delete assist.dataset.pageNumberManual;
  focusEditableBlock(assist);
  markDocumentChanged();
};

const removePageNumberAssistForPosition = (position = "top") => {
  const normalizedPosition = normalizePageNumberPosition(position, "top");
  const assists = Array.from(
    editor.querySelectorAll(`.page-assist[data-page-kind="page-number"][data-page-number-position="${normalizedPosition}"]`)
  );
  let changed = false;

  assists.forEach((assist) => {
    if (!(assist instanceof HTMLElement)) return;
    assist.remove();
    changed = true;
  });

  if (!changed) return false;
  markDocumentChanged();
  scheduleAutoPageBreakGuides();
  return true;
};

const expectedPageAssistHtml = (source, pageNumber) => {
  if (!(source instanceof HTMLElement)) return "";
  const baseHtml = String(source.innerHTML || "");
  if (!baseHtml || isPageAssistContentEmpty(source)) return "";
  if (source.dataset.pageNumberAuto !== "true") return baseHtml;

  const format = normalizePageNumberFormat(
    source.dataset.pageNumberFormat || inferPageNumberFormatFromText(source.textContent || "")
  );
  const temp = document.createElement("div");
  temp.innerHTML = baseHtml;
  const text = String(temp.textContent || "").replace(/\s+/g, " ").trim();
  temp.textContent = applyPageNumberTokenToText(text, pageNumber, format, {
    replaceTrailingNumber: format === "number"
  });
  return temp.innerHTML;
};

const removeOutOfRangeAutoPageAssists = (maxPageCount) => {
  let removed = false;
  const assists = Array.from(editor.querySelectorAll(".page-assist[data-page-repeat-auto='true']"));
  assists.forEach((assist) => {
    const pageIndex = Number(assist.dataset.pageIndex || "0");
    if (!Number.isFinite(pageIndex) || pageIndex < 2 || pageIndex <= maxPageCount) return;
    assist.remove();
    removed = true;
  });
  return removed;
};

const syncRepeatedPageAssists = (pageCount) => {
  let changed = false;
  const maxPageCount = Math.max(1, Number(pageCount) || 1);

  if (removeOutOfRangeAutoPageAssists(maxPageCount)) {
    changed = true;
  }

  [
    { kind: "header", selectorOptions: {}, insertOptions: {} },
    { kind: "footer", selectorOptions: {}, insertOptions: {} },
    {
      kind: "page-number",
      selectorOptions: { pageNumberPosition: "top" },
      insertOptions: { pageNumberPosition: "top" }
    },
    {
      kind: "page-number",
      selectorOptions: { pageNumberPosition: "bottom" },
      insertOptions: { pageNumberPosition: "bottom" }
    }
  ].forEach((entry) => {
    const source = editor.querySelector(pageAssistSelector(entry.kind, 1, entry.selectorOptions));
    const sourceHtml = expectedPageAssistHtml(source, 1);
    const sourceAlign =
      source instanceof HTMLElement
        ? normalizeParagraphAlignment(source.dataset.align || source.style.textAlign || "right")
        : "right";
    const sourceFormat =
      source instanceof HTMLElement
        ? normalizePageNumberFormat(source.dataset.pageNumberFormat || inferPageNumberFormatFromText(source.textContent || ""))
        : "page";

    if (!sourceHtml) {
      const stale = Array.from(editor.querySelectorAll(".page-assist[data-page-repeat-auto='true']")).filter((assist) => {
        if (!(assist instanceof HTMLElement)) return false;
        if (normalizePageAssistKind(assist) !== entry.kind) return false;
        if (entry.kind === "page-number") {
          return normalizePageNumberPosition(assist.dataset.pageNumberPosition, "bottom") ===
            normalizePageNumberPosition(entry.selectorOptions.pageNumberPosition, "bottom");
        }
        return true;
      });
      stale.forEach((assist) => {
        const pageIndex = Number(assist.dataset.pageIndex || "0");
        if (pageIndex >= 2) {
          assist.remove();
          changed = true;
        }
      });
      return;
    }

    for (let pageNumber = 2; pageNumber <= maxPageCount; pageNumber += 1) {
      let assist = editor.querySelector(pageAssistSelector(entry.kind, pageNumber, entry.selectorOptions));
      const expectedHtml = expectedPageAssistHtml(source, pageNumber);
      if (!expectedHtml) continue;

      if (!(assist instanceof HTMLElement)) {
        assist = insertPageAssistForPage(entry.kind, pageNumber - 1, {
          focus: false,
          markDirty: false,
          initialText: "",
          markAsPageNumber: source instanceof HTMLElement && source.dataset.pageNumberAuto === "true",
          repeatAuto: true,
          align: sourceAlign,
          ...entry.insertOptions
        });
        if (assist instanceof HTMLElement) {
          assist.innerHTML = expectedHtml;
          changed = true;
        }
      }

      if (!(assist instanceof HTMLElement) || assist.dataset.pageRepeatAuto !== "true") continue;

      if (assist.innerHTML !== expectedHtml) {
        assist.innerHTML = expectedHtml;
        changed = true;
      }
      if (entry.kind === "page-number") {
        const expectedPosition = normalizePageNumberPosition(entry.insertOptions.pageNumberPosition, "bottom");
        if (assist.dataset.pageNumberPosition !== expectedPosition) {
          assist.dataset.pageNumberPosition = expectedPosition;
          changed = true;
        }
      }
      if (syncPageAssistVisibility(assist)) {
        changed = true;
      }
      if (source instanceof HTMLElement && source.dataset.pageNumberAuto === "true") {
        assist.dataset.pageNumberAuto = "true";
        assist.dataset.pageNumberFormat = sourceFormat;
        delete assist.dataset.pageNumberManual;
      } else {
        delete assist.dataset.pageNumberAuto;
        delete assist.dataset.pageNumberFormat;
      }
      if (normalizeParagraphAlignment(assist.dataset.align || assist.style.textAlign || "right") !== sourceAlign) {
        assist.dataset.align = sourceAlign;
        assist.style.textAlign = sourceAlign;
        changed = true;
      }
      assist.dataset.pageRepeatAuto = "true";
      delete assist.dataset.pageRepeatManual;
    }
  });

  return changed;
};

const createPageCornerHotspot = (pageIndex, pageHeightPx) => {
  const hotspot = document.createElement("div");
  hotspot.className = "page-corner-hotspot";
  hotspot.dataset.pageIndex = String(pageIndex);
  hotspot.style.top = `${Math.round(pageIndex * pageHeightPx + 8)}px`;

  const trigger = document.createElement("button");
  trigger.type = "button";
  trigger.className = "page-corner-trigger";
  trigger.textContent = "+";
  trigger.setAttribute("aria-label", `Add header, footer, note, or page number on page ${pageIndex + 1}`);
  trigger.title = "Add page note, header, footer, or page number";

  const menu = document.createElement("div");
  menu.className = "page-corner-menu";
  const setPageNumberSubmenuOpen = (isOpen) => {
    hotspot.classList.toggle("is-page-number-submenu-open", Boolean(isOpen));
  };

  const makeBaseOption = (label, kind) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "page-corner-option";
    option.textContent = label;
    option.dataset.pageAssistKind = kind;
    return option;
  };

  const baseOptions = document.createElement("div");
  baseOptions.className = "page-corner-base-options";

  [
    { kind: "note", label: "Page Note" },
    { kind: "header", label: "Header" },
    { kind: "footer", label: "Footer" }
  ].forEach((entry) => {
    const option = makeBaseOption(entry.label, entry.kind);
    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closePageCornerMenu();
      insertPageAssistForPage(entry.kind, pageIndex);
    });
    baseOptions.append(option);
  });

  const pageNumberTrigger = makeBaseOption("Page Number ▸", "page-number");
  pageNumberTrigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    syncSelectedPageNumberFormat();
    setPageNumberSubmenuOpen(true);
  });
  baseOptions.append(pageNumberTrigger);

  const pageNumberSubmenu = document.createElement("div");
  pageNumberSubmenu.className = "page-number-submenu";

  const submenuTitle = document.createElement("div");
  submenuTitle.className = "page-number-submenu-title";
  submenuTitle.textContent = "Page Number";
  pageNumberSubmenu.append(submenuTitle);

  let selectedPageNumberFormat = "page";
  const resolvePageNumberFormatForPosition = (position) => {
    const pageNumber = Math.max(1, Math.floor(pageIndex) + 1);
    const assist = editor.querySelector(pageAssistSelector("page-number", pageNumber, { pageNumberPosition: position }));
    if (!(assist instanceof HTMLElement)) return null;
    return normalizePageNumberFormat(
      assist.dataset.pageNumberFormat || inferPageNumberFormatFromText(assist.textContent || "")
    );
  };
  const formatButtons = [];
  const applySelectedPageNumberFormat = (nextFormat) => {
    selectedPageNumberFormat = normalizePageNumberFormat(nextFormat);
    formatButtons.forEach((button) => {
      button.classList.toggle("is-selected", button.dataset.pageNumberFormatChoice === selectedPageNumberFormat);
    });
  };
  const syncSelectedPageNumberFormat = () => {
    const topFormat = resolvePageNumberFormatForPosition("top");
    const bottomFormat = resolvePageNumberFormatForPosition("bottom");
    applySelectedPageNumberFormat(topFormat || bottomFormat || "page");
  };

  const formatRow = document.createElement("div");
  formatRow.className = "page-number-submenu-row page-number-submenu-format";
  const formatLabel = document.createElement("span");
  formatLabel.className = "page-number-submenu-row-label";
  formatLabel.textContent = "Style";
  formatRow.append(formatLabel);
  [
    { format: "page", label: "Page" },
    { format: "number", label: "#" }
  ].forEach((spec) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "page-corner-option page-number-submenu-option";
    button.dataset.pageNumberFormatChoice = spec.format;
    button.textContent = spec.label;
    button.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      applySelectedPageNumberFormat(spec.format);
    });
    formatButtons.push(button);
    formatRow.append(button);
  });
  pageNumberSubmenu.append(formatRow);
  syncSelectedPageNumberFormat();

  const alignOptions = [
    { align: "left", label: "L" },
    { align: "center", label: "C" },
    { align: "right", label: "R" }
  ];

  [
    { position: "top", label: "Top" },
    { position: "bottom", label: "Bottom" }
  ].forEach((rowSpec) => {
    const row = document.createElement("div");
    row.className = "page-number-submenu-row";

    const rowLabel = document.createElement("span");
    rowLabel.className = "page-number-submenu-row-label";
    rowLabel.textContent = rowSpec.label;
    row.append(rowLabel);

    alignOptions.forEach((alignSpec) => {
      const option = document.createElement("button");
      option.type = "button";
      option.className = "page-corner-option page-number-submenu-option";
      option.textContent = alignSpec.label;
      option.dataset.pageNumberPosition = rowSpec.position;
      option.dataset.pageNumberAlign = alignSpec.align;
      option.title = `${rowSpec.label} ${alignSpec.align}`;
      option.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        closePageCornerMenu();
        insertPageNumberAssistForPage(pageIndex, {
          position: rowSpec.position,
          align: alignSpec.align,
          format: selectedPageNumberFormat
        });
      });
      row.append(option);
    });

    pageNumberSubmenu.append(row);
  });

  [
    { position: "top", label: "Remove Top Number" },
    { position: "bottom", label: "Remove Bottom Number" }
  ].forEach((entry) => {
    const option = document.createElement("button");
    option.type = "button";
    option.className = "page-corner-option page-number-submenu-remove";
    option.textContent = entry.label;
    option.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      closePageCornerMenu();
      removePageNumberAssistForPosition(entry.position);
    });
    pageNumberSubmenu.append(option);
  });

  const submenuBack = document.createElement("button");
  submenuBack.type = "button";
  submenuBack.className = "page-corner-option page-number-submenu-back";
  submenuBack.textContent = "← Back";
  submenuBack.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    setPageNumberSubmenuOpen(false);
  });
  pageNumberSubmenu.append(submenuBack);

  menu.append(baseOptions, pageNumberSubmenu);

  trigger.addEventListener("click", (event) => {
    event.preventDefault();
    event.stopPropagation();
    if (openPageCornerMenu === hotspot) {
      closePageCornerMenu();
      return;
    }
    closePageCornerMenu();
    setPageNumberSubmenuOpen(false);
    hotspot.classList.add("is-open");
    openPageCornerMenu = hotspot;
  });

  hotspot.append(trigger, menu);
  return hotspot;
};

const renderAutoPageBreakGuides = () => {
  if (!pageSurface) return;
  const viewportAnchor = captureViewportAnchorState();
  const caretMarker = createEditorCaretMarker();
  mergeTransientPageFlowSplits(editor, true);
  normalizePageAssistBlocks();
  const focusedAssist =
    document.activeElement instanceof Element ? document.activeElement.closest(".page-assist") : null;
  const focusedAssistKind =
    focusedAssist instanceof HTMLElement && editor.contains(focusedAssist) ? resolvePageAssistBoundaryKind(focusedAssist) : "";
  const focusedAssistPage =
    focusedAssist instanceof HTMLElement && editor.contains(focusedAssist) ? normalizePageAssistPageNumber(focusedAssist) : 0;
  const showHeaderBand = focusedAssistKind === "header";
  const showFooterBand = focusedAssistKind === "footer";
  pageSurface.classList.toggle("is-header-editing", showHeaderBand);
  pageSurface.classList.toggle("is-footer-editing", showFooterBand);
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  if (pageSize === "endless") {
    normalizeRunawayInlineSpacingInEditor();
    renderedPageCount = 1;
    stripTransientPageFlowState(editor, true);
    clearPositionedPageAssists();
    clearReferencesOwnPageOffset();
    closePageCornerMenu();
    pageFrameLayer.replaceChildren();
    autoPageBreakLayer.replaceChildren();
    pageCornerLayer.replaceChildren();
    pageSurface.style.removeProperty("--sheet-full-height");
    pageSurface.classList.remove("has-auto-page-breaks");
    pageSurface.classList.remove("is-header-editing", "is-footer-editing");
    scheduleWindowStatus(false);
    if (caretMarker) {
      restoreEditorCaretFromMarker(caretMarker);
    }
    restoreViewportAnchorState(viewportAnchor);
    return;
  }

  const pageHeightPx = renderedScreenPageHeightPx();
  if (!Number.isFinite(pageHeightPx) || pageHeightPx <= 0) {
    normalizeRunawayInlineSpacingInEditor();
    renderedPageCount = 1;
    stripTransientPageFlowState(editor, true);
    clearPositionedPageAssists();
    clearReferencesOwnPageOffset();
    closePageCornerMenu();
    pageFrameLayer.replaceChildren();
    autoPageBreakLayer.replaceChildren();
    pageCornerLayer.replaceChildren();
    pageSurface.style.removeProperty("--sheet-full-height");
    pageSurface.classList.remove("has-auto-page-breaks");
    pageSurface.classList.remove("is-header-editing", "is-footer-editing");
    scheduleWindowStatus(false);
    if (caretMarker) {
      restoreEditorCaretFromMarker(caretMarker);
    }
    restoreViewportAnchorState(viewportAnchor);
    return;
  }
  const computed = window.getComputedStyle(pageSurface);
  const pageTopPadding = Math.max(0, parseFloat(computed.paddingTop) || 0);
  const pageBottomPadding = Math.max(0, parseFloat(computed.paddingBottom) || 0);

  const computePageCount = () => {
    const titleBottom = titleField ? titleField.offsetTop + titleField.offsetHeight : 0;
    const bodyBottom = editor ? editor.offsetTop + editor.offsetHeight : 0;
    const referencesBottom = referencesSection ? referencesSection.offsetTop + referencesSection.offsetHeight : 0;
    const contentBottom = Math.max(titleBottom, bodyBottom, referencesBottom);
    const totalHeight = Math.max(contentBottom + 12, pageHeightPx);
    return Math.max(1, Math.ceil(totalHeight / pageHeightPx));
  };

  let pageCount = computePageCount();
  for (let pass = 0; pass < 16; pass += 1) {
    const visibilityChanged = syncAllPageAssistVisibility();
    const assistChanged = syncRepeatedPageAssists(pageCount);
    const flowChanged = syncEditorPageFlowAdjustments(pageHeightPx);
    const splitChanged = splitOverflowingTextBlocksAcrossPages(getFixedPageFlowMetrics(pageHeightPx));
    const assistPositionChanged = syncFixedPageAssistPlacement(pageHeightPx);
    syncReferencesOwnPageOffset(pageHeightPx);
    const recalculated = computePageCount();
    if (!visibilityChanged && !assistChanged && !flowChanged && !splitChanged && !assistPositionChanged && recalculated === pageCount) {
      break;
    }
    pageCount = recalculated;
  }
  syncAllPageAssistVisibility();
  syncFixedPageAssistPlacement(pageHeightPx);
  syncReferencesOwnPageOffset(pageHeightPx);
  pageCount = computePageCount();
  renderedPageCount = pageCount;
  pageSurface.style.setProperty("--sheet-full-height", `${Math.round(pageCount * pageHeightPx)}px`);

  closePageCornerMenu();
  const frameFragment = document.createDocumentFragment();
  const guideFragment = document.createDocumentFragment();
  const cornerFragment = document.createDocumentFragment();
  const pageHeightRounded = Math.round(pageHeightPx);

  for (let index = 0; index < pageCount; index += 1) {
    const frame = document.createElement("div");
    frame.className = "virtual-page-frame";
    frame.style.top = `${Math.round(index * pageHeightPx)}px`;
    frame.style.height = `${pageHeightRounded}px`;
    frame.dataset.pageIndex = String(index + 1);

    const headerBoundary = document.createElement("div");
    headerBoundary.className = "virtual-page-content-boundary virtual-page-content-boundary-header";
    headerBoundary.style.top = `${Math.round(pageTopPadding)}px`;
    if (showHeaderBand && focusedAssistPage === index + 1) {
      headerBoundary.classList.add("is-active");
      headerBoundary.dataset.boundaryLabel = "Header";
    }

    const footerBoundary = document.createElement("div");
    footerBoundary.className = "virtual-page-content-boundary virtual-page-content-boundary-footer";
    footerBoundary.style.bottom = `${Math.round(pageBottomPadding)}px`;
    if (showFooterBand && focusedAssistPage === index + 1) {
      footerBoundary.classList.add("is-active");
      footerBoundary.dataset.boundaryLabel = "Footer";
    }

    frame.append(headerBoundary, footerBoundary);

    frameFragment.append(frame);
  }
  for (let index = 1; index < pageCount; index += 1) {
    const guide = document.createElement("div");
    guide.className = "auto-page-break-guide";
    guide.style.top = `${Math.round(index * pageHeightPx)}px`;
    guideFragment.append(guide);
  }
  for (let index = 0; index < pageCount; index += 1) {
    cornerFragment.append(createPageCornerHotspot(index, pageHeightPx));
  }

  pageFrameLayer.replaceChildren(frameFragment);
  autoPageBreakLayer.replaceChildren(guideFragment);
  pageCornerLayer.replaceChildren(cornerFragment);
  pageSurface.classList.toggle("has-auto-page-breaks", pageCount > 1);
  scheduleWindowStatus(false);
  if (caretMarker) {
    restoreEditorCaretFromMarker(caretMarker);
  }
  restoreViewportAnchorState(viewportAnchor);
};

const scheduleAutoPageBreakGuides = () => {
  if (!pageSurface) return;
  if (softPageGuideTimer) {
    clearTimeout(softPageGuideTimer);
    softPageGuideTimer = null;
  }
  if (typingPageGuideTimer) {
    clearTimeout(typingPageGuideTimer);
    typingPageGuideTimer = null;
  }
  if (pageGuideSyncFrame) return;
  pageGuideSyncFrame = window.requestAnimationFrame(() => {
    pageGuideSyncFrame = 0;
    renderAutoPageBreakGuides();
  });
};

const scheduleAutoPageBreakGuidesSoft = () => {
  if (!pageSurface) return;
  if (pageGuideSyncFrame) return;
  if (typingPageGuideTimer) {
    clearTimeout(typingPageGuideTimer);
    typingPageGuideTimer = null;
  }
  if (softPageGuideTimer) {
    clearTimeout(softPageGuideTimer);
  }
  softPageGuideTimer = setTimeout(() => {
    softPageGuideTimer = null;
    scheduleAutoPageBreakGuides();
  }, SOFT_PAGE_GUIDE_DELAY_MS);
};

const scheduleAutoPageBreakGuidesForTyping = (options = {}) => {
  if (!pageSurface) return;
  if (pageGuideSyncFrame) return;
  const withinTable = Boolean(options.withinTable);
  const relaxed = Boolean(options.relaxed);
  const delay = withinTable
    ? TABLE_TYPING_PAGE_GUIDE_DELAY_MS
    : relaxed
      ? RELAXED_TYPING_PAGE_GUIDE_DELAY_MS
      : TYPING_PAGE_GUIDE_DELAY_MS;
  if (typingPageGuideTimer) {
    clearTimeout(typingPageGuideTimer);
  }
  typingPageGuideTimer = setTimeout(() => {
    typingPageGuideTimer = null;
    scheduleAutoPageBreakGuides();
  }, delay);
};

const applyPageLayout = () => {
  if (!pageSurface) return;
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  const orientation = normalizePageOrientation(metadataSettings.pageOrientation);
  const margins = normalizePageMargins(metadataSettings.pageMargins);
  pageSurface.style.setProperty("--page-margin-top", `${margins.top}in`);
  pageSurface.style.setProperty("--page-margin-right", `${margins.right}in`);
  pageSurface.style.setProperty("--page-margin-bottom", `${margins.bottom}in`);
  pageSurface.style.setProperty("--page-margin-left", `${margins.left}in`);

  if (pageSize === "endless") {
    pageSurface.classList.remove("is-fixed-page");
    pageSurface.style.removeProperty("--sheet-width");
    pageSurface.style.removeProperty("--sheet-min-height");
    scheduleAutoPageBreakGuides();
    return;
  }

  const baseDimensions = SCREEN_PAGE_DIMENSIONS_IN[pageSize] || SCREEN_PAGE_DIMENSIONS_IN.Letter;
  const dimensions = getOrientedDimensions(baseDimensions, orientation);
  pageSurface.classList.add("is-fixed-page");
  pageSurface.style.setProperty("--sheet-width", `${dimensions.width}in`);
  pageSurface.style.setProperty("--sheet-min-height", `${dimensions.height}in`);
  scheduleAutoPageBreakGuides();
};

const currentPdfLayout = () => {
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  const orientation = normalizePageOrientation(metadataSettings.pageOrientation);
  const baseDimensions =
    pageSize === "A4" ? PDF_PAGE_DIMENSIONS_PT.A4 : PDF_PAGE_DIMENSIONS_PT.Letter;
  const dimensions = getOrientedDimensions(baseDimensions, orientation);
  const margins = normalizePageMargins(metadataSettings.pageMargins);
  const marginTop = margins.top * POINTS_PER_INCH;
  const marginRight = margins.right * POINTS_PER_INCH;
  const marginBottom = margins.bottom * POINTS_PER_INCH;
  const marginLeft = margins.left * POINTS_PER_INCH;

  return {
    pageWidth: dimensions.width,
    pageHeight: dimensions.height,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    innerWidth: Math.max(20, dimensions.width - marginLeft - marginRight),
    innerHeight: Math.max(20, dimensions.height - marginTop - marginBottom)
  };
};

const currentDocxLayout = () => {
  const pageSize = normalizePageSize(metadataSettings.pageSize);
  const orientation = normalizePageOrientation(metadataSettings.pageOrientation);
  const baseDimensions =
    pageSize === "A4" ? PDF_PAGE_DIMENSIONS_PT.A4 : PDF_PAGE_DIMENSIONS_PT.Letter;
  const dimensions = getOrientedDimensions(baseDimensions, orientation);
  const margins = normalizePageMargins(metadataSettings.pageMargins);

  return {
    widthTwips: Math.round(dimensions.width * 20),
    heightTwips: Math.round(dimensions.height * 20),
    marginTopTwips: Math.round(margins.top * TWIPS_PER_INCH),
    marginRightTwips: Math.round(margins.right * TWIPS_PER_INCH),
    marginBottomTwips: Math.round(margins.bottom * TWIPS_PER_INCH),
    marginLeftTwips: Math.round(margins.left * TWIPS_PER_INCH)
  };
};

const normalizeCitationList = (value) => {
  if (!Array.isArray(value)) return [];
  const normalized = [];

  for (const entry of value) {
    if (!entry || typeof entry !== "object") continue;
    const id =
      typeof entry.id === "string" && entry.id.trim()
        ? entry.id.trim()
        : `cite-${Math.random().toString(36).slice(2, 10)}`;
    const text = normalizeInlineText(typeof entry.text === "string" ? entry.text : "");
    const author = normalizeInlineText(entry.author);
    const title = normalizeInlineText(entry.title);
    const source = normalizeInlineText(entry.source);
    const year = normalizeInlineText(entry.year);
    const url = normalizeInlineText(entry.url);
    const accessed = normalizeInlineText(entry.accessed);
    const customText = normalizeInlineText(entry.customText);
    const hasGeneratorData = Boolean(author || title || source || year || url || accessed);
    if (!text && !customText && !hasGeneratorData) continue;
    normalized.push({
      id,
      text,
      author,
      title,
      source,
      year,
      url,
      accessed,
      customText
    });
  }

  return normalized;
};

const createCitationId = () => {
  return `cite-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 7)}`;
};

const citationIndexById = (id) => {
  return citations.findIndex((entry) => entry.id === id);
};

const citationDraftFromInputs = () => {
  return {
    author: normalizeInlineText(citationAuthorInput ? citationAuthorInput.value : ""),
    title: normalizeInlineText(citationTitleInput ? citationTitleInput.value : ""),
    source: normalizeInlineText(citationSourceInput ? citationSourceInput.value : ""),
    year: normalizeInlineText(citationYearInput ? citationYearInput.value : ""),
    url: normalizeInlineText(citationUrlInput ? citationUrlInput.value : ""),
    accessed: normalizeInlineText(citationAccessedInput ? citationAccessedInput.value : ""),
    customText: normalizeInlineText(citationInput ? citationInput.value : "")
  };
};

const citationHasGeneratorData = (entry) => {
  if (!entry || typeof entry !== "object") return false;
  return Boolean(
    normalizeInlineText(entry.author) ||
      normalizeInlineText(entry.title) ||
      normalizeInlineText(entry.source) ||
      normalizeInlineText(entry.year) ||
      normalizeInlineText(entry.url) ||
      normalizeInlineText(entry.accessed)
  );
};

const citationHasAnyData = (entry) => {
  if (!entry || typeof entry !== "object") return false;
  return Boolean(
    citationHasGeneratorData(entry) ||
      normalizeInlineText(entry.customText) ||
      normalizeInlineText(entry.text)
  );
};

const citationSentence = (value) => {
  const normalized = normalizeInlineText(value);
  if (!normalized) return "";
  if (/[.!?]$/.test(normalized)) return normalized;
  return `${normalized}.`;
};

const citationQuotedTitle = (value) => {
  const normalized = normalizeInlineText(value);
  if (!normalized) return "";
  const unquoted = normalized.replace(/^["']+|["']+$/g, "").replace(/\.+$/g, "");
  if (!unquoted) return "";
  return `"${unquoted}."`;
};

const citationAccessedText = (value) => {
  const normalized = normalizeInlineText(value);
  if (!normalized) return "";
  const withoutTrailing = normalized.replace(/[.!?]+$/g, "");
  return `Accessed ${withoutTrailing}.`;
};

const citationFallbackText = (entry) => {
  const parts = [
    normalizeInlineText(entry && entry.author),
    normalizeInlineText(entry && entry.title),
    normalizeInlineText(entry && entry.source),
    normalizeInlineText(entry && entry.year),
    normalizeInlineText(entry && entry.url),
    normalizeInlineText(entry && entry.accessed)
  ].filter(Boolean);
  if (parts.length === 0) return "";
  return citationSentence(parts.join(", "));
};

const generateCitationText = (entry, format = metadataSettings.citationFormat) => {
  const normalizedFormat = normalizeCitationFormat(format);
  const author = normalizeInlineText(entry && entry.author);
  const title = normalizeInlineText(entry && entry.title);
  const source = normalizeInlineText(entry && entry.source);
  const year = normalizeInlineText(entry && entry.year);
  const url = normalizeInlineText(entry && entry.url);
  const accessed = normalizeInlineText(entry && entry.accessed);
  const customText = normalizeInlineText(entry && entry.customText);
  const legacyText = normalizeInlineText(entry && entry.text);
  const fallbackText = legacyText || customText || citationFallbackText(entry);
  const hasGeneratorData = Boolean(author || title || source || year || url || accessed);

  if (normalizedFormat === "Custom") {
    return customText || fallbackText;
  }

  if (!hasGeneratorData) {
    return fallbackText;
  }

  if (normalizedFormat === "APA") {
    const output = [];
    if (author) output.push(citationSentence(author));
    if (year) output.push(`(${year}).`);
    if (title) output.push(citationSentence(title));
    if (source) output.push(citationSentence(source));
    if (url && accessed) {
      output.push(`Retrieved ${accessed.replace(/[.!?]+$/g, "")}, from ${citationSentence(url).replace(/[.!?]+$/g, "")}.`);
    } else if (url) {
      output.push(citationSentence(url));
    }
    return output.join(" ").trim() || fallbackText;
  }

  if (normalizedFormat === "Chicago") {
    const output = [];
    if (author) output.push(citationSentence(author));
    if (title) output.push(citationQuotedTitle(title));
    const sourceAndYear = [source, year].filter(Boolean).join(", ");
    if (sourceAndYear) output.push(citationSentence(sourceAndYear));
    if (url) output.push(citationSentence(url));
    if (accessed) output.push(citationAccessedText(accessed));
    return output.join(" ").trim() || fallbackText;
  }

  const output = [];
  if (author) output.push(citationSentence(author));
  if (title) output.push(citationQuotedTitle(title));
  const sourceAndYear = [source, year].filter(Boolean).join(", ");
  if (sourceAndYear) output.push(citationSentence(sourceAndYear));
  if (url) output.push(citationSentence(url));
  if (accessed) output.push(citationAccessedText(accessed));
  return output.join(" ").trim() || fallbackText;
};

const citationDisplayText = (entry) => {
  return generateCitationText(entry, metadataSettings.citationFormat);
};

const clearCitationGeneratorInputs = () => {
  if (citationAuthorInput) citationAuthorInput.value = "";
  if (citationTitleInput) citationTitleInput.value = "";
  if (citationSourceInput) citationSourceInput.value = "";
  if (citationYearInput) citationYearInput.value = "";
  if (citationUrlInput) citationUrlInput.value = "";
  if (citationAccessedInput) citationAccessedInput.value = "";
  if (citationInput) citationInput.value = "";
};

const syncCitationPreview = () => {
  if (!(citationPreview instanceof HTMLElement)) return;
  const previewText = generateCitationText(citationDraftFromInputs(), metadataSettings.citationFormat);
  citationPreview.textContent = previewText || "Fill in details to generate a citation.";
};

const createCitationEntryFromDraft = (draft) => {
  if (!draft || !citationHasAnyData(draft)) return null;
  const hasGeneratorData = citationHasGeneratorData(draft);
  const customText = normalizeInlineText(draft.customText);
  const generated = normalizeInlineText(generateCitationText(draft, metadataSettings.citationFormat));
  const fallbackText = hasGeneratorData ? customText : customText || generated;
  return {
    id: createCitationId(),
    text: fallbackText,
    author: normalizeInlineText(draft.author),
    title: normalizeInlineText(draft.title),
    source: normalizeInlineText(draft.source),
    year: normalizeInlineText(draft.year),
    url: normalizeInlineText(draft.url),
    accessed: normalizeInlineText(draft.accessed),
    customText: normalizeInlineText(draft.customText)
  };
};

const collectCitationFigureEntries = () => {
  const blocks = Array.from(editor.querySelectorAll(".graph-block, .image-block"));
  return blocks
    .filter((block) => block instanceof HTMLElement)
    .map((block, index) => {
      const isGraph = block.classList.contains("graph-block");
      const numberNode = block.querySelector(".graph-figure-number, .image-figure-number");
      const captionNode = block.querySelector(isGraph ? ".graph-caption-text" : ".image-caption-text");
      const figureNumber = String(numberNode ? numberNode.textContent || "" : "")
        .replace(/\s+/g, " ")
        .trim() || `Figure ${index + 1}.`;
      const captionText = String(captionNode ? captionNode.textContent || "" : "")
        .replace(/\s+/g, " ")
        .trim() || (isGraph ? "Graph caption" : "Image caption");
      const label = `${figureNumber} ${captionText}`.replace(/\s+/g, " ").trim();
      return {
        target: block,
        mediaType: isGraph ? "Graph" : "Image",
        label
      };
    });
};

const collectCitationTableEntries = () => {
  const tables = Array.from(editor.querySelectorAll("table"));
  return tables
    .filter((table) => table instanceof HTMLTableElement && !table.closest(".graph-block, .image-block"))
    .map((table, index) => {
      const caption = table.querySelector("caption");
      const captionText = String(caption ? caption.textContent || "" : "")
        .replace(/\s+/g, " ")
        .trim();
      return {
        target: table,
        label: captionText || `Table ${index + 1}.`
      };
    });
};

const jumpToCitationFigure = (entry) => {
  if (!entry || !(entry.target instanceof HTMLElement) || !editor.contains(entry.target)) return;
  closeInlineCommandMenu();
  closeMenuAndReset();
  resetTabState();
  closeSectionFinder();
  if (entry.target.classList.contains("graph-block")) {
    activateGraphBlock(entry.target);
  } else if (entry.target.classList.contains("image-block")) {
    activateImageBlock(entry.target);
  }
  entry.target.focus({ preventScroll: true });
  entry.target.scrollIntoView({ block: "center", inline: "nearest" });
};

const jumpToCitationTable = (entry) => {
  if (!entry || !(entry.target instanceof HTMLTableElement) || !editor.contains(entry.target)) return;
  closeInlineCommandMenu();
  closeMenuAndReset();
  resetTabState();
  closeSectionFinder();
  deactivateGraphBlock();
  deactivateImageBlock();
  editor.focus({ preventScroll: true });
  const targetCell = entry.target.querySelector("caption, tbody th, tbody td, th, td");
  if (targetCell) {
    selectStartOfNode(targetCell);
  } else {
    selectStartOfNode(entry.target);
  }
  entry.target.scrollIntoView({ block: "center", inline: "nearest" });
};

const appendCitationSubsectionTitle = (label) => {
  const title = document.createElement("div");
  title.className = "citation-subsection-title";
  title.textContent = label;
  citationList.append(title);
};

const sanitizeReferencesHeading = (value) => {
  return String(value || "").replace(/\s+/g, " ").trim();
};

const normalizeReferencesHeading = (value) => {
  const sanitized = sanitizeReferencesHeading(value);
  return sanitized || DEFAULT_REFERENCES_HEADING;
};

const refreshCitationMarkersAndReferences = () => {
  const citationOrder = new Map();
  citations.forEach((entry, index) => {
    citationOrder.set(entry.id, index + 1);
  });

  const markers = Array.from(editor.querySelectorAll(".citation-marker"));
  for (const marker of markers) {
    const id = marker.dataset.citeId || "";
    const order = citationOrder.get(id);
    if (!order) {
      marker.remove();
      continue;
    }
    marker.textContent = `${order}`;
    marker.dataset.citeOrder = String(order);
  }
  referencesList.innerHTML = "";

  citations.forEach((entry) => {
    const item = document.createElement("li");
    item.textContent = citationDisplayText(entry);
    referencesList.append(item);
  });
};

const renderCitationList = () => {
  citationList.innerHTML = "";

  appendCitationSubsectionTitle("Citations");
  if (citations.length === 0) {
    const empty = document.createElement("div");
    empty.className = "citation-item citation-item-empty";
    empty.textContent = "No citations yet.";
    citationList.append(empty);
  } else {
    citationIndex = Math.max(0, Math.min(citations.length - 1, citationIndex));
    citations.forEach((entry, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "citation-item";
      item.textContent = citationDisplayText(entry);
      if (index === citationIndex) {
        item.classList.add("is-selected");
      }

      item.addEventListener("click", () => {
        citationIndex = index;
        renderCitationList();
        insertCitationMarker(citations[index].id);
      });

      citationList.append(item);
    });
  }

  appendCitationSubsectionTitle("Graphs & Figures");
  const figures = collectCitationFigureEntries();
  if (figures.length === 0) {
    citationFigureIndex = -1;
    const emptyFigures = document.createElement("div");
    emptyFigures.className = "citation-item citation-item-empty";
    emptyFigures.textContent = "No graphs or figures yet.";
    citationList.append(emptyFigures);
  } else {
    citationFigureIndex = Math.max(0, Math.min(figures.length - 1, citationFigureIndex));
    figures.forEach((entry, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "citation-item citation-item-figure";
      if (index === citationFigureIndex) {
        item.classList.add("is-figure-selected");
      }

      const kind = document.createElement("span");
      kind.className = "citation-item-figure-kind";
      kind.textContent = entry.mediaType;
      const label = document.createElement("span");
      label.className = "citation-item-figure-label";
      label.textContent = entry.label;
      item.append(kind, label);

      item.addEventListener("click", () => {
        citationFigureIndex = index;
        renderCitationList();
        jumpToCitationFigure(entry);
      });

      citationList.append(item);
    });
  }

  appendCitationSubsectionTitle("Tables");
  const tables = collectCitationTableEntries();
  if (tables.length === 0) {
    citationTableIndex = -1;
    const emptyTables = document.createElement("div");
    emptyTables.className = "citation-item citation-item-empty";
    emptyTables.textContent = "No tables yet.";
    citationList.append(emptyTables);
  } else {
    citationTableIndex = Math.max(0, Math.min(tables.length - 1, citationTableIndex));
    tables.forEach((entry, index) => {
      const item = document.createElement("button");
      item.type = "button";
      item.className = "citation-item citation-item-table";
      if (index === citationTableIndex) {
        item.classList.add("is-table-selected");
      }

      const kind = document.createElement("span");
      kind.className = "citation-item-table-kind";
      kind.textContent = "Table";
      const label = document.createElement("span");
      label.className = "citation-item-table-label";
      label.textContent = entry.label;
      item.append(kind, label);

      item.addEventListener("click", () => {
        citationTableIndex = index;
        renderCitationList();
        jumpToCitationTable(entry);
      });

      citationList.append(item);
    });
  }

  const selectedItem = citationList.querySelector(
    ".citation-item.is-selected, .citation-item-figure.is-figure-selected, .citation-item-table.is-table-selected"
  );
  if (selectedItem && typeof selectedItem.scrollIntoView === "function") {
    selectedItem.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
};

const persistCitationState = () => {
  setFeatureState("citations", citations);
};

const persistMetadataState = () => {
  setFeatureState("metadata", metadataSettings);
};

const closeCitationSidebar = () => {
  citationSidebarOpen = false;
  citationInsertPending = false;
  pendingCitationRange = null;
  citationSidebar.classList.remove("is-open");
  citationSidebar.setAttribute("aria-hidden", "true");
};

const openCitationSidebar = (forInsertion = false) => {
  closeAllPanels();
  citationInsertPending = Boolean(forInsertion);
  pendingCitationRange = citationInsertPending ? captureCurrentSelectionRange(editor) : null;
  citationSidebarOpen = true;
  citationSidebar.classList.add("is-open");
  citationSidebar.setAttribute("aria-hidden", "false");
  citationIndex = Math.max(0, Math.min(citations.length - 1, citationIndex));
  renderCitationList();
  syncCitationPreview();

  if (citationInsertPending && citations.length > 0) {
    const selectedItem = citationList.querySelector(".citation-item.is-selected");
    if (selectedItem && typeof selectedItem.focus === "function") {
      selectedItem.focus({ preventScroll: true });
      return;
    }
  }

  if (citationAuthorInput instanceof HTMLElement) {
    citationAuthorInput.focus({ preventScroll: true });
    return;
  }
  if (citationInput instanceof HTMLElement) {
    citationInput.focus({ preventScroll: true });
  }
};

const closeMetadataPane = () => {
  metadataOpen = false;
  metadataPane.classList.remove("is-open");
  metadataPane.setAttribute("aria-hidden", "true");
};

const openMetadataPane = () => {
  closeAllPanels();

  metadataOpen = true;
  metadataPane.classList.add("is-open");
  metadataPane.setAttribute("aria-hidden", "false");
  citationFormatSelect.value = normalizeCitationFormat(metadataSettings.citationFormat);
  pageSizeSelect.value = normalizePageSize(metadataSettings.pageSize);
  pageOrientationSelect.value = normalizePageOrientation(metadataSettings.pageOrientation);
  syncMarginInputs(metadataSettings.pageMargins);
  citationFormatSelect.focus({ preventScroll: true });
};

const toggleMetadataPane = () => {
  if (metadataOpen) {
    closeMetadataPane();
  } else {
    openMetadataPane();
  }
};

const insertCitationMarker = (citationId) => {
  if (!restoreSelectionRange(pendingCitationRange)) {
    ensureSelectionOnSurface();
  }
  const index = citationIndexById(citationId);
  if (index < 0) return;

  const marker = document.createElement("span");
  marker.className = "citation-marker";
  marker.dataset.citeId = citationId;
  marker.setAttribute("contenteditable", "false");
  marker.textContent = `${index + 1}`;

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;
  const range = selection.getRangeAt(0);
  range.deleteContents();
  range.insertNode(marker);

  const spacer = document.createTextNode(" ");
  marker.parentNode.insertBefore(spacer, marker.nextSibling);

  const nextRange = document.createRange();
  nextRange.setStart(spacer, 1);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);

  pendingCitationRange = null;
  closeCitationSidebar();
  markDocumentChanged();
  refreshCitationMarkersAndReferences();
};

const addCitation = (insertAfterAdd = false) => {
  const draft = citationDraftFromInputs();
  const created = createCitationEntryFromDraft(draft);
  if (!created) return;

  citations.push(created);
  clearCitationGeneratorInputs();
  syncCitationPreview();
  citationIndex = citations.length - 1;
  persistCitationState();
  renderCitationList();
  refreshCitationMarkersAndReferences();

  if (insertAfterAdd || citationInsertPending) {
    insertCitationMarker(created.id);
  }
};

const rightmostTextNode = (node) => {
  if (!node) return null;
  if (node.nodeType === Node.TEXT_NODE) return node;
  if (!node.hasChildNodes || !node.hasChildNodes()) return null;
  let cursor = node.lastChild;
  while (cursor) {
    const candidate = rightmostTextNode(cursor);
    if (candidate) return candidate;
    cursor = cursor.previousSibling;
  }
  return null;
};

const getInlineContext = (container, maxChars = 16) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null;

  const anchorNode = selection.anchorNode;
  if (!anchorNode || !container.contains(anchorNode)) return null;

  if (anchorNode.nodeType === Node.TEXT_NODE) {
    const text = anchorNode.nodeValue || "";
    const offset = selection.anchorOffset;
    return {
      node: anchorNode,
      offset,
      textBefore: text.slice(Math.max(0, offset - maxChars), offset)
    };
  }

  if (isElementNode(anchorNode)) {
    const childOffset = selection.anchorOffset;
    if (childOffset <= 0) return null;
    const previousChild = anchorNode.childNodes[childOffset - 1];
    const textNode = rightmostTextNode(previousChild);
    if (!textNode) return null;
    const text = textNode.nodeValue || "";
    const offset = text.length;
    return {
      node: textNode,
      offset,
      textBefore: text.slice(Math.max(0, offset - maxChars), offset)
    };
  }

  return null;
};

const getInlineCommandContext = (container = editor) => {
  const context = getInlineContext(container, 64);
  if (!context) return null;

  const match = context.textBefore.match(/(?:^|\s)(\\[a-z]*)$/i);
  if (!match) return null;
  const tokenRaw = match[1] || "";
  const tokenRoot = tokenRaw.slice(1).toLowerCase();
  const normalizedToken = `\\${tokenRoot}`;
  if (!normalizedToken.startsWith("\\")) return null;

  return {
    ...context,
    normalizedToken,
    prefix: "\\",
    start: context.offset - tokenRaw.length
  };
};

const commandTriggerRoot = (trigger) => {
  const raw = String(trigger || "").trim();
  if (!raw) return "";
  if (raw.startsWith("\\")) {
    return raw.slice(1).toLowerCase();
  }
  return raw.toLowerCase();
};

const commandTriggerWithPrefix = (command) => {
  const root = commandTriggerRoot(command && command.trigger);
  if (!root) return "";
  return `\\${root}`;
};

const commandTriggerVariants = (command) => {
  const root = commandTriggerRoot(command && command.trigger);
  if (!root) return [];
  return [`\\${root}`];
};

const syncInlineCommandSelectionState = ({ scroll = false } = {}) => {
  const items = Array.from(inlineCommandMenu.querySelectorAll(".inline-command-item"));
  items.forEach((item, index) => {
    const isSelected = index === inlineCommandIndex;
    item.classList.toggle("is-selected", isSelected);
    item.setAttribute("aria-selected", isSelected ? "true" : "false");
  });
  if (scroll) {
    items[inlineCommandIndex]?.scrollIntoView({ block: "nearest", inline: "nearest" });
  }
};

const replaceInlineTokenAtCaret = (context, replacement) => {
  const { node, offset, start } = context;
  const source = node.nodeValue || "";
  node.nodeValue = `${source.slice(0, start)}${replacement}${source.slice(offset)}`;

  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.setStart(node, start + replacement.length);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const renderInlineCommandMenu = () => {
  inlineCommandMenu.innerHTML = "";
  if (!inlineCommandOpen || inlineCommandMatches.length === 0) return;
  inlineCommandMenu.setAttribute("role", "listbox");

  inlineCommandMatches.forEach((command, index) => {
    const item = document.createElement("button");
    item.type = "button";
    item.className = "inline-command-item";
    item.setAttribute("role", "option");
    item.setAttribute("aria-selected", index === inlineCommandIndex ? "true" : "false");
    if (index === inlineCommandIndex) {
      item.classList.add("is-selected");
    }

    const trigger = document.createElement("span");
    trigger.className = "inline-command-trigger";
    trigger.textContent = commandTriggerWithPrefix(command);
    const hint = document.createElement("span");
    hint.className = "inline-command-hint";
    hint.textContent = command.label;

    item.addEventListener("mousedown", (event) => {
      event.preventDefault();
    });
    item.addEventListener("mouseenter", () => {
      if (inlineCommandIndex === index) return;
      inlineCommandIndex = index;
      syncInlineCommandSelectionState();
    });
    item.addEventListener("click", (event) => {
      event.preventDefault();
      inlineCommandIndex = index;
      syncInlineCommandSelectionState();
      executeSelectedInlineCommandAtCaret();
    });

    item.append(trigger, hint);
    inlineCommandMenu.append(item);
  });

  syncInlineCommandSelectionState({ scroll: true });
};

const closeInlineCommandMenu = () => {
  inlineCommandOpen = false;
  inlineCommandIndex = 0;
  inlineCommandMatches = [];
  inlineCommandPrefix = "\\";
  skipInlineCommandSyncOnce = false;
  inlineCommandMenu.classList.remove("is-open");
  inlineCommandMenu.setAttribute("aria-hidden", "true");
  inlineCommandMenu.removeAttribute("role");
  inlineCommandMenu.style.maxHeight = "";
  inlineCommandMenu.innerHTML = "";
};

const positionInlineCommandMenu = () => {
  if (!inlineCommandOpen) return;
  const rect = getCaretRect();
  if (!rect) return;

  const viewportPadding = 12;
  const verticalOffset = 8;
  const viewportTop = window.scrollY + viewportPadding;
  const viewportBottom = window.scrollY + window.innerHeight - viewportPadding;
  const availableViewportHeight = Math.max(120, window.innerHeight - viewportPadding * 2);
  const menuMaxHeight = Math.min(300, availableViewportHeight);
  inlineCommandMenu.style.maxHeight = `${menuMaxHeight}px`;

  const menuWidth = inlineCommandMenu.offsetWidth || 220;
  const desiredMenuHeight = inlineCommandMenu.scrollHeight || inlineCommandMenu.offsetHeight || menuMaxHeight;
  const menuHeight = Math.min(desiredMenuHeight, menuMaxHeight);
  const left = Math.min(window.scrollX + rect.left, window.scrollX + window.innerWidth - menuWidth - viewportPadding);
  const clampedLeft = Math.max(window.scrollX + viewportPadding, left);
  const belowTop = window.scrollY + rect.bottom + verticalOffset;
  const aboveTop = window.scrollY + rect.top - menuHeight - verticalOffset;
  let top = belowTop;
  if (belowTop + menuHeight > viewportBottom && aboveTop >= viewportTop) {
    top = aboveTop;
  } else if (belowTop + menuHeight > viewportBottom) {
    top = Math.max(viewportTop, viewportBottom - menuHeight);
  }

  inlineCommandMenu.style.left = `${clampedLeft}px`;
  inlineCommandMenu.style.top = `${top}px`;
};

const syncInlineCommandMenu = () => {
  if (menuOpen || saveFormatOpen || citationSidebarOpen || mediaStorageSidebarOpen || metadataOpen) {
    closeInlineCommandMenu();
    return;
  }

  const context = getInlineCommandContext(editor);
  if (!context) {
    closeInlineCommandMenu();
    return;
  }

  const matches = INLINE_COMMANDS.filter((command) => {
    const normalizedTrigger = commandTriggerWithPrefix(command);
    return normalizedTrigger.startsWith(context.normalizedToken);
  });
  if (matches.length === 0) {
    closeInlineCommandMenu();
    return;
  }

  const selectedTrigger = inlineCommandMatches[inlineCommandIndex]?.trigger || "";
  const preservedIndex = matches.findIndex((command) => command.trigger === selectedTrigger);
  inlineCommandMatches = matches;
  inlineCommandIndex = preservedIndex >= 0 ? preservedIndex : 0;
  inlineCommandPrefix = context.prefix;
  inlineCommandOpen = true;
  inlineCommandMenu.classList.add("is-open");
  inlineCommandMenu.setAttribute("aria-hidden", "false");
  renderInlineCommandMenu();
  positionInlineCommandMenu();
};

const completeInlineCommandAtCaret = (step = 1) => {
  if (menuOpen || saveFormatOpen || citationSidebarOpen || mediaStorageSidebarOpen || metadataOpen) return false;

  if (!inlineCommandOpen || inlineCommandMatches.length === 0) {
    syncInlineCommandMenu();
  }
  if (!inlineCommandOpen || inlineCommandMatches.length === 0) return false;

  const context = getInlineCommandContext(editor);
  if (!context) {
    closeInlineCommandMenu();
    return false;
  }

  const current = inlineCommandMatches[inlineCommandIndex];
  let nextIndex = inlineCommandIndex;
  const currentTrigger = commandTriggerWithPrefix(current);
  if (!current || context.normalizedToken === currentTrigger) {
    nextIndex = (inlineCommandIndex + step + inlineCommandMatches.length) % inlineCommandMatches.length;
  } else if (step < 0) {
    nextIndex = inlineCommandMatches.length - 1;
  }

  const nextCommand = inlineCommandMatches[nextIndex];
  if (!nextCommand) return false;

  skipInlineCommandSyncOnce = true;
  const replacementTrigger = commandTriggerWithPrefix(nextCommand);
  const replaced = replaceInlineTokenAtCaret(context, replacementTrigger);
  if (!replaced) {
    skipInlineCommandSyncOnce = false;
    return false;
  }

  inlineCommandIndex = nextIndex;
  inlineCommandPrefix = context.prefix;
  renderInlineCommandMenu();
  positionInlineCommandMenu();
  return true;
};

const executeSelectedInlineCommandAtCaret = () => {
  if (!inlineCommandOpen || inlineCommandMatches.length === 0) return false;
  const context = getInlineCommandContext(editor);
  if (!context) {
    closeInlineCommandMenu();
    return false;
  }

  const command = inlineCommandMatches[inlineCommandIndex] || inlineCommandMatches[0];
  if (!command) return false;

  const { node, offset, start } = context;
  if (typeof start !== "number" || start < 0 || !(node instanceof Text)) return false;
  const source = node.nodeValue || "";
  node.nodeValue = `${source.slice(0, start)}${source.slice(offset)}`;

  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.setStart(node, start);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);

  closeInlineCommandMenu();
  executeInlineCommand(command.id);
  return true;
};

const consumeInlineTrigger = (container, trigger) => {
  const context = getInlineContext(container, trigger.length + 4);
  if (!context) return false;

  const { node, offset, textBefore } = context;
  const escaped = trigger.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  // Only execute a command after the user confirms it with a trailing space.
  const match = textBefore.match(new RegExp(`${escaped}(?:[ \\u00a0])$`));
  if (!match) return false;

  const matchedText = match[0] || "";
  const start = offset - matchedText.length;
  if (start > 0) {
    const boundary = (node.nodeValue || "").charAt(start - 1);
    if (boundary && !/\s/.test(boundary)) {
      return false;
    }
  }
  node.nodeValue = `${node.nodeValue.slice(0, start)}${node.nodeValue.slice(offset)}`;

  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  range.setStart(node, start);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const getAutoListContext = (container = editor) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null;

  const anchorNode = selection.anchorNode;
  if (!anchorNode || !container.contains(anchorNode)) return null;

  const anchorElement = isElementNode(anchorNode) ? anchorNode : anchorNode.parentElement;
  if (!anchorElement) return null;

  const block = anchorElement.closest("p, div, blockquote");
  if (!block || !container.contains(block) || block.closest("li")) return null;

  const activeRange = selection.getRangeAt(0);
  const beforeRange = activeRange.cloneRange();
  beforeRange.setStart(block, 0);

  const afterRange = activeRange.cloneRange();
  afterRange.setEnd(block, block.childNodes.length);

  const normalize = (text) => String(text || "").replace(/\u00a0/g, " ").replace(/\u200b/g, "");
  return {
    beforeText: normalize(beforeRange.toString()),
    afterText: normalize(afterRange.toString()),
    beforeRange
  };
};

const consumeAutoListTrigger = (container = editor) => {
  const context = getAutoListContext(container);
  if (!context) return false;

  if (/\S/.test(context.afterText)) return false;

  let command = "";
  if (/^\d+\.\s$/.test(context.beforeText)) {
    command = "insertOrderedList";
  } else if (/^-\s$/.test(context.beforeText)) {
    command = "insertUnorderedList";
  }
  if (!command) return false;

  context.beforeRange.deleteContents();
  document.execCommand(command);
  updateMenuVisuals();
  return true;
};

const AUTO_LINK_MATCH_REGEX = /\b((?:https?:\/\/|www\.)[^\s<>"']+)/gi;
const AUTO_LINK_BLOCK_SELECTOR = ".page-assist, p, div, li, blockquote, h2, h3, h4, h5, #title, #references-heading";

const shouldScheduleAutoLinkFromInputEvent = (event) => {
  if (!event || typeof event !== "object") return false;
  if (event.isComposing) return false;
  const inputType = String(event.inputType || "");
  if (inputType === "insertParagraph" || inputType === "insertLineBreak") return true;
  if (inputType !== "insertText") return false;
  const data = String(event.data || "");
  return data === " " || data === "\u00a0";
};

const shouldIncludePreviousBlockForAutoLink = (event) => {
  const inputType = String((event && event.inputType) || "");
  return inputType === "insertParagraph" || inputType === "insertLineBreak";
};

const trimAutoLinkTrailingPunctuation = (rawValue) => {
  const raw = String(rawValue || "");
  if (!raw) return { value: "", trailing: "" };

  let end = raw.length;
  while (end > 0) {
    const ch = raw[end - 1];
    if (/[.,!?;:]/.test(ch)) {
      end -= 1;
      continue;
    }
    if (/[)\]}]/.test(ch)) {
      const slice = raw.slice(0, end);
      const opens = (slice.match(/[\(\[\{]/g) || []).length;
      const closes = (slice.match(/[\)\]\}]/g) || []).length;
      if (closes > opens) {
        end -= 1;
        continue;
      }
    }
    break;
  }

  return {
    value: raw.slice(0, end),
    trailing: raw.slice(end)
  };
};

const isLikelyAutoLinkUrl = (value) => {
  const normalized = String(value || "").trim();
  if (!normalized) return false;
  return /^(?:https?:\/\/|www\.)[^\s<>"']+\.[^\s<>"']+$/i.test(normalized);
};

const normalizeAutoLinkHref = (value) => {
  const normalized = String(value || "").trim();
  if (!normalized) return "";
  if (/^https?:\/\//i.test(normalized)) return normalized;
  return `https://${normalized}`;
};

const isEditableSurfaceAnchor = (anchor) => {
  if (!(anchor instanceof HTMLAnchorElement)) return false;
  if (
    anchor.closest(".graph-block, .image-block, .graph-settings, .image-settings, .citation-sidebar, .media-storage-sidebar, .metadata-pane")
  ) {
    return false;
  }
  if (titleField && titleField.contains(anchor)) return true;
  if (editor && editor.contains(anchor)) return true;
  if (referencesHeading && referencesHeading.contains(anchor)) return true;
  if (referencesList && referencesList.contains(anchor)) return true;
  return false;
};

const resolveAnchorNavigationHref = (anchor) => {
  if (!(anchor instanceof HTMLAnchorElement)) return "";
  const raw = String(anchor.getAttribute("href") || anchor.href || "").trim();
  if (!raw) return "";
  if (/^(https?:\/\/|mailto:|tel:)/i.test(raw)) return raw;
  return normalizeAutoLinkHref(raw);
};

const openAnchorFromEditableSurface = (anchor) => {
  const href = resolveAnchorNavigationHref(anchor);
  if (!href) return false;
  try {
    window.open(href, "_blank", "noopener,noreferrer");
    return true;
  } catch {
    return false;
  }
};

const autoLinkBlockForNode = (node) => {
  const element = isElementNode(node) ? node : node && node.parentElement;
  if (!(element instanceof Element)) return null;
  const block = element.closest(AUTO_LINK_BLOCK_SELECTOR);
  if (!(block instanceof HTMLElement)) return null;
  if (block === editor) return null;
  if (block.closest(".graph-block, .image-block")) return null;
  return block;
};

const collectAutoLinkTextNodes = (root) => {
  if (!(root instanceof Element)) return [];
  const nodes = [];
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!(node instanceof Text)) return NodeFilter.FILTER_REJECT;
      const text = String(node.nodeValue || "");
      if (!text || (!text.includes("http://") && !text.includes("https://") && !text.includes("www."))) {
        return NodeFilter.FILTER_REJECT;
      }
      const parent = node.parentElement;
      if (!parent) return NodeFilter.FILTER_REJECT;
      if (parent.closest("a, .graph-block, .image-block, .citation-marker, [contenteditable='false']")) {
        return NodeFilter.FILTER_REJECT;
      }
      return NodeFilter.FILTER_ACCEPT;
    }
  });

  let current = walker.nextNode();
  while (current) {
    nodes.push(current);
    current = walker.nextNode();
  }
  return nodes;
};

const linkifyTextNodeUrls = (textNode) => {
  if (!(textNode instanceof Text)) return false;
  const source = String(textNode.nodeValue || "");
  if (!source) return false;

  AUTO_LINK_MATCH_REGEX.lastIndex = 0;
  let match = AUTO_LINK_MATCH_REGEX.exec(source);
  if (!match) return false;

  const fragment = document.createDocumentFragment();
  let cursor = 0;
  let changed = false;

  while (match) {
    const full = String(match[1] || "");
    const start = match.index;
    const end = start + full.length;
    const trimmed = trimAutoLinkTrailingPunctuation(full);
    const core = trimmed.value;
    if (isLikelyAutoLinkUrl(core)) {
      if (start > cursor) {
        fragment.append(document.createTextNode(source.slice(cursor, start)));
      }
      const anchor = document.createElement("a");
      anchor.href = normalizeAutoLinkHref(core);
      anchor.textContent = core;
      anchor.target = "_blank";
      anchor.rel = "noopener noreferrer";
      fragment.append(anchor);
      if (trimmed.trailing) {
        fragment.append(document.createTextNode(trimmed.trailing));
      }
      cursor = end;
      changed = true;
    }
    match = AUTO_LINK_MATCH_REGEX.exec(source);
  }

  if (!changed) return false;
  if (cursor < source.length) {
    fragment.append(document.createTextNode(source.slice(cursor)));
  }
  textNode.replaceWith(fragment);
  return true;
};

const linkifyUrlsInBlock = (block) => {
  if (!(block instanceof Element)) return false;
  const textNodes = collectAutoLinkTextNodes(block);
  let changed = false;
  textNodes.forEach((node) => {
    if (linkifyTextNodeUrls(node)) changed = true;
  });
  return changed;
};

const runAutoLinkNearCaret = (includePreviousBlock = false) => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;
  const anchorNode = selection.anchorNode;
  if (!anchorNode) return false;

  const inSurface =
    titleField.contains(anchorNode) ||
    editor.contains(anchorNode) ||
    (referencesHeading ? referencesHeading.contains(anchorNode) : false);
  if (!inSurface) return false;

  const anchorElement = isElementNode(anchorNode) ? anchorNode : anchorNode.parentElement;
  if (anchorElement && anchorElement.closest(".graph-block, .image-block")) return false;

  const marker = document.createElement("span");
  marker.dataset.autoLinkMarker = "true";
  marker.setAttribute("aria-hidden", "true");
  marker.style.display = "inline-block";
  marker.style.width = "0";
  marker.style.overflow = "hidden";
  marker.style.lineHeight = "0";
  marker.style.padding = "0";
  marker.style.margin = "0";
  marker.style.border = "0";

  const caretRange = selection.getRangeAt(0).cloneRange();
  caretRange.collapse(true);
  caretRange.insertNode(marker);

  const targets = [];
  const currentBlock = autoLinkBlockForNode(marker);
  if (currentBlock) {
    targets.push(currentBlock);
    if (includePreviousBlock) {
      const previous = currentBlock.previousElementSibling;
      const previousBlock = autoLinkBlockForNode(previous);
      if (previousBlock) {
        targets.push(previousBlock);
      }
    }
  } else if (marker.parentElement) {
    targets.push(marker.parentElement);
  }

  let changed = false;
  const seen = new Set();
  targets.forEach((target) => {
    if (!(target instanceof Element)) return;
    if (seen.has(target)) return;
    seen.add(target);
    if (linkifyUrlsInBlock(target)) {
      changed = true;
    }
  });

  if (marker.isConnected) {
    const restoreRange = document.createRange();
    restoreRange.setStartAfter(marker);
    restoreRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(restoreRange);
    marker.remove();
  }

  return changed;
};

const scheduleAutoLinkNearCaret = (includePreviousBlock = false) => {
  pendingAutoLinkIncludePrevious = pendingAutoLinkIncludePrevious || includePreviousBlock;
  if (autoLinkTimer) return;
  autoLinkTimer = setTimeout(() => {
    autoLinkTimer = null;
    const shouldIncludePrevious = pendingAutoLinkIncludePrevious;
    pendingAutoLinkIncludePrevious = false;
    if (runAutoLinkNearCaret(shouldIncludePrevious)) {
      markDocumentChanged();
    }
  }, 0);
};

const GRAPH_CHART_TYPES = new Set(["line", "bar", "scatter"]);

const normalizeGraphChartType = (value) => {
  const token = String(value || "")
    .trim()
    .toLowerCase();
  return GRAPH_CHART_TYPES.has(token) ? token : "line";
};

const fallbackGraphState = () => {
  return {
    chartType: "line",
    chartTitle: "Chart Title",
    xTitle: "",
    yTitle: "Y Axis",
    caption: "Graph caption",
    grid: true,
    x: ["1", "2", "3", "4"],
    series: [
      {
        name: "Series 1",
        values: [2, 4, 3, 6]
      }
    ]
  };
};

const graphEngine = () => {
  return window.PaperGraphEngine && typeof window.PaperGraphEngine.normalizeState === "function"
    ? window.PaperGraphEngine
    : null;
};

const normalizeGraphState = (value) => {
  const engine = graphEngine();
  if (engine && typeof engine.normalizeState === "function") {
    return engine.normalizeState(value);
  }
  const fallback = fallbackGraphState();
  const source = value && typeof value === "object" ? value : {};
  return {
    chartType: normalizeGraphChartType(source.chartType || fallback.chartType),
    chartTitle: typeof source.chartTitle === "string" ? source.chartTitle : fallback.chartTitle,
    xTitle: typeof source.xTitle === "string" ? source.xTitle : fallback.xTitle,
    yTitle: typeof source.yTitle === "string" ? source.yTitle : fallback.yTitle,
    caption: typeof source.caption === "string" ? source.caption : fallback.caption,
    grid: source.grid !== false,
    x: Array.isArray(source.x) && source.x.length > 0 ? source.x.map((entry) => String(entry || "").trim()) : fallback.x,
    series: Array.isArray(source.series) && source.series.length > 0 ? source.series : fallback.series
  };
};

const readGraphState = (block) => {
  if (!block || !(block instanceof Element)) return normalizeGraphState();
  try {
    const parsed = JSON.parse(block.dataset.graphState || "{}");
    return normalizeGraphState(parsed);
  } catch {
    return normalizeGraphState();
  }
};

const writeGraphState = (block, state) => {
  if (!block || !(block instanceof Element)) return;
  block.dataset.graphState = JSON.stringify(normalizeGraphState(state));
};

const alignGraphSeriesToXAxis = (state) => {
  const safeState = normalizeGraphState(state);
  const xCount = safeState.x.length;
  safeState.series = safeState.series.map((series, index) => {
    const name = typeof series.name === "string" && series.name.trim() ? series.name.trim() : `Series ${index + 1}`;
    const values = Array.isArray(series.values) ? [...series.values] : [];
    while (values.length < xCount) {
      values.push(null);
    }
    if (values.length > xCount) {
      values.length = xCount;
    }
    return {
      name,
      values
    };
  });
  return safeState;
};

const parseGraphXTable = (text) => {
  const engine = graphEngine();
  if (engine && typeof engine.parseXTable === "function") {
    return engine.parseXTable(text);
  }
  return String(text || "")
    .replace(/\r/g, "")
    .split(/\n|\t/)
    .map((cell) => cell.trim())
    .filter(Boolean);
};

const parseGraphSeriesTable = (text, xCount) => {
  const engine = graphEngine();
  if (engine && typeof engine.parseSeriesTable === "function") {
    return engine.parseSeriesTable(text, xCount);
  }
  const rows = String(text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean);

  const normalizedRows = rows.map((row, index) => {
    const cells = row.split(/\t|,/).map((cell) => cell.trim());
    const name = cells[0] || `Series ${index + 1}`;
    const values = cells.slice(1).map((cell) => {
      const numeric = Number(cell);
      return Number.isFinite(numeric) ? numeric : null;
    });
    while (values.length < xCount) {
      values.push(null);
    }
    if (values.length > xCount) {
      values.length = xCount;
    }
    return { name, values };
  });

  return normalizedRows;
};

const splitGraphPasteRow = (row) => {
  if (row.includes("\t")) return row.split("\t");
  if (row.includes(",")) return row.split(",");
  return [row];
};

const parseNumericOnlySeriesRows = (text, xCount) => {
  const rows = String(text || "")
    .replace(/\r/g, "")
    .split("\n")
    .map((row) => row.trim())
    .filter(Boolean)
    .map((row) => splitGraphPasteRow(row).map((cell) => cell.trim()));

  if (rows.length === 0) return null;

  const allNumeric = rows.every((cells) =>
    cells.every((cell) => {
      if (!cell) return true;
      const numeric = Number(cell);
      return Number.isFinite(numeric);
    })
  );
  if (!allNumeric) return null;

  return rows.map((cells) => {
    const values = cells.map((cell) => {
      if (!cell) return null;
      const numeric = Number(cell);
      return Number.isFinite(numeric) ? numeric : null;
    });
    while (values.length < xCount) {
      values.push(null);
    }
    if (values.length > xCount) {
      values.length = xCount;
    }
    return { name: "", values };
  });
};

const promptForSeriesNames = (series, existingSeriesCount, forcePrompt) => {
  if (!Array.isArray(series) || series.length === 0) return null;
  const output = series.map((entry) => ({
    name: String(entry && entry.name ? entry.name : "").trim(),
    values: Array.isArray(entry && entry.values) ? [...entry.values] : []
  }));

  const isGenericName = (value) => /^series\s+\d+$/i.test(String(value || "").trim());
  const isNumericName = (value) => {
    const raw = String(value || "").trim();
    if (!raw) return false;
    const numeric = Number(raw);
    return Number.isFinite(numeric);
  };

  for (let index = 0; index < output.length; index += 1) {
    const currentName = output[index].name;
    const needsPrompt = forcePrompt || !currentName || isGenericName(currentName) || isNumericName(currentName);
    if (!needsPrompt) continue;
    const suggested = `Series ${existingSeriesCount + index + 1}`;
    const promptLabel = output.length === 1 ? "Name this series:" : `Name for series ${index + 1}:`;
    const entered = window.prompt(promptLabel, currentName || suggested);
    if (entered === null) return null;
    const cleaned = String(entered).trim();
    output[index].name = cleaned || suggested;
  }

  return output;
};

const graphTableForXAxis = (state) => {
  const engine = graphEngine();
  if (engine && typeof engine.toXTable === "function") {
    return engine.toXTable(state);
  }
  return normalizeGraphState(state).x.join(", ");
};

const graphTableForSeries = (state) => {
  const engine = graphEngine();
  if (engine && typeof engine.toSeriesTable === "function") {
    return engine.toSeriesTable(state);
  }
  return normalizeGraphState(state).series
    .map((series, index) => {
      const name = series.name || `Series ${index + 1}`;
      return [name, ...series.values.map((value) => (value == null ? "" : String(value)))].join(", ");
    })
    .join("\n");
};

const copyGraphTableText = async (text) => {
  if (navigator.clipboard && typeof navigator.clipboard.writeText === "function") {
    try {
      await navigator.clipboard.writeText(text);
      return;
    } catch {
      // Fallback below.
    }
  }
  window.prompt("Copy graph table:", text);
};

const deactivateGraphBlock = () => {
  if (!activeGraphBlock) return;
  const openPasteArea = activeGraphBlock.querySelector(".graph-paste-area.is-open");
  if (openPasteArea) {
    openPasteArea.classList.remove("is-open");
    const toggle = openPasteArea.querySelector(".graph-paste-toggle");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
    }
  }
  activeGraphBlock.classList.remove("is-active");
  activeGraphBlock = null;
  scheduleAutoPageBreakGuides();
};

const activateGraphBlock = (block) => {
  if (!block || !(block instanceof Element) || !block.classList.contains("graph-block")) return;
  if (activeImageBlock) {
    activeImageBlock.classList.remove("is-active");
    activeImageBlock = null;
  }
  if (activeGraphBlock && activeGraphBlock !== block) {
    activeGraphBlock.classList.remove("is-active");
  }
  activeGraphBlock = block;
  block.classList.add("is-active");
};

const upgradeGraphBlockDOM = (block) => {
  const settings = block.querySelector(".graph-settings");
  if (!settings) return;
  const hasSpreadsheet = Boolean(block.querySelector(".graph-spreadsheet"));
  const hasModernPaste = Boolean(block.querySelector(".graph-paste-toggle") && block.querySelector(".graph-paste-panel"));
  const hasChartTypeField = Boolean(settings.querySelector(".graph-input-chart-type"));

  if (hasSpreadsheet && hasModernPaste && hasChartTypeField) return;

  if (!hasSpreadsheet) {
    // Remove old elements (axis buttons on chart, old table editor)
    block.querySelectorAll(".graph-axis-button-x, .graph-axis-button-y").forEach((el) => el.remove());
    const oldEditor = settings.querySelector(".graph-table-editor");
    if (oldEditor) oldEditor.remove();
    const oldButtons = settings.querySelector(".graph-data-buttons");
    if (oldButtons) oldButtons.remove();
  }

  // Add tooltip if missing
  const chartWrap = block.querySelector(".graph-chart-wrap");
  if (chartWrap && !chartWrap.querySelector(".graph-tooltip")) {
    const tip = document.createElement("div");
    tip.className = "graph-tooltip";
    chartWrap.append(tip);
  }

  if (!hasChartTypeField) {
    const chartTypeField = document.createElement("label");
    chartTypeField.className = "graph-setting";
    chartTypeField.innerHTML = "<span>Chart type</span>";
    const chartTypeSelect = document.createElement("select");
    chartTypeSelect.className = "graph-input graph-input-chart-type";
    [
      ["line", "Line"],
      ["bar", "Bar"],
      ["scatter", "Scatter"]
    ].forEach(([value, label]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = label;
      chartTypeSelect.append(option);
    });
    chartTypeField.append(chartTypeSelect);

    const preferredRow =
      settings.querySelector(".graph-settings-row:nth-of-type(2)") || settings.querySelector(".graph-settings-row");
    if (preferredRow instanceof HTMLElement) {
      const gridToggleField = preferredRow.querySelector(".graph-toggle");
      if (gridToggleField && gridToggleField.parentElement === preferredRow) {
        preferredRow.insertBefore(chartTypeField, gridToggleField);
      } else {
        preferredRow.append(chartTypeField);
      }
    } else {
      settings.prepend(chartTypeField);
    }
  }

  if (!hasSpreadsheet) {
    const frag = document.createRange().createContextualFragment(`
      <div class="graph-spreadsheet" data-axis="x">
        <div class="graph-spreadsheet-header">
          <span class="graph-spreadsheet-title">X Axis Values</span>
          <div class="graph-spreadsheet-actions">
            <button type="button" data-spreadsheet-action="add-point">+ Point</button>
            <button type="button" data-spreadsheet-action="remove-point">&minus; Point</button>
          </div>
        </div>
        <div class="graph-spreadsheet-grid"></div>
      </div>
      <div class="graph-spreadsheet" data-axis="y">
        <div class="graph-spreadsheet-header">
          <span class="graph-spreadsheet-title">Series Data</span>
          <div class="graph-spreadsheet-actions">
            <button type="button" data-spreadsheet-action="add-series">+ Series</button>
            <button type="button" data-spreadsheet-action="remove-series">&minus; Series</button>
          </div>
        </div>
        <div class="graph-spreadsheet-grid"></div>
      </div>
      <div class="graph-paste-area">
        <button type="button" class="graph-paste-toggle" data-graph-paste="toggle" aria-expanded="false">Paste table data</button>
        <div class="graph-paste-panel">
          <textarea class="graph-table-textarea" spellcheck="false" placeholder="Paste CSV data here"></textarea>
          <div class="graph-table-actions">
            <button type="button" data-graph-table="apply-x">Apply as X</button>
            <button type="button" data-graph-table="apply-y">Apply as Series</button>
          </div>
        </div>
      </div>
    `);
    settings.append(frag);
    return;
  }

  if (!hasModernPaste) {
    const pasteArea = settings.querySelector(".graph-paste-area");
    if (!pasteArea) return;

    const existingTextarea = pasteArea.querySelector(".graph-table-textarea");
    const existingActions = pasteArea.querySelector(".graph-table-actions");
    pasteArea.innerHTML = "";

    const toggle = document.createElement("button");
    toggle.type = "button";
    toggle.className = "graph-paste-toggle";
    toggle.dataset.graphPaste = "toggle";
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Paste table data";
    pasteArea.append(toggle);

    const panel = document.createElement("div");
    panel.className = "graph-paste-panel";
    if (existingTextarea) panel.append(existingTextarea);
    if (existingActions) panel.append(existingActions);
    pasteArea.append(panel);
  }
};

const renderGraphInBlock = (block, state) => {
  const normalized = normalizeGraphState(state);
  block.classList.toggle("graph-grid-off", normalized.grid === false);
  const captionNode = block.querySelector(".graph-caption-text");
  if (captionNode) {
    captionNode.textContent = normalized.caption || "Graph caption";
  }

  const syncInputValue = (input, value) => {
    if (!input) return;
    if (document.activeElement !== input) input.value = value;
  };
  syncInputValue(block.querySelector(".graph-input-chart-title"), normalized.chartTitle || "");
  syncInputValue(block.querySelector(".graph-input-x-title"), normalized.xTitle || "");
  syncInputValue(block.querySelector(".graph-input-y-title"), normalized.yTitle || "");
  syncInputValue(block.querySelector(".graph-input-caption"), normalized.caption || "");
  syncInputValue(block.querySelector(".graph-input-chart-type"), normalizeGraphChartType(normalized.chartType));
  const gridToggle = block.querySelector(".graph-input-grid");
  if (gridToggle) gridToggle.checked = normalized.grid !== false;

  const svg = block.querySelector(".graph-svg");
  const engine = graphEngine();
  if (svg && engine && typeof engine.render === "function") {
    const chartHeight = normalized.series.length > 1 ? 340 : 320;
    engine.render(svg, normalized, { width: 620, height: chartHeight });
    return;
  }

  if (svg) {
    svg.innerHTML = "";
    const ns = "http://www.w3.org/2000/svg";
    const text = document.createElementNS(ns, "text");
    text.setAttribute("x", "310");
    text.setAttribute("y", "160");
    text.setAttribute("text-anchor", "middle");
    text.setAttribute("font-size", "16");
    text.setAttribute("fill", "#000");
    text.textContent = "Graph renderer unavailable";
    svg.append(text);
  }
};

const syncGraphFigureNumbers = () => {
  const blocks = Array.from(editor.querySelectorAll(".graph-block, .image-block"));
  blocks.forEach((block, index) => {
    const numberNode = block.querySelector(".graph-figure-number, .image-figure-number");
    if (numberNode) {
      numberNode.textContent = `Figure ${index + 1}.`;
    }
  });
  if (citationSidebarOpen) {
    renderCitationList();
  }
};

const bindGraphBlock = (block, options = {}) => {
  if (!block || !(block instanceof Element) || !block.classList.contains("graph-block")) return;
  const shouldRender = options.forceRender !== false;
  block.setAttribute("contenteditable", "false");
  block.setAttribute("tabindex", "0");
  block.setAttribute("draggable", "true");
  upgradeGraphBlockDOM(block);

  if (graphBoundBlocks.has(block)) {
    if (shouldRender) {
      renderGraphInBlock(block, readGraphState(block));
    }
    return;
  }

  graphBoundBlocks.add(block);
  block.dataset.graphBound = "true";
  const chartTitleInput = block.querySelector(".graph-input-chart-title");
  const xTitleInput = block.querySelector(".graph-input-x-title");
  const yTitleInput = block.querySelector(".graph-input-y-title");
  const captionInput = block.querySelector(".graph-input-caption");
  const chartTypeInput = block.querySelector(".graph-input-chart-type");
  const gridToggle = block.querySelector(".graph-input-grid");

  const readState = () => readGraphState(block);
  let settingCommitTimer = null;

  // Prevent graph-control input events from reaching editor-wide input handlers.
  block.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(".graph-settings")) return;
    event.stopPropagation();
  });

  const queueSettingCommit = (key, value) => {
    if (settingCommitTimer) {
      clearTimeout(settingCommitTimer);
    }
    settingCommitTimer = setTimeout(() => {
      settingCommitTimer = null;
      const state = readState();
      state[key] = value;
      commitState(state);
    }, 90);
  };

  const flushSettingCommit = () => {
    if (!settingCommitTimer) return;
    clearTimeout(settingCommitTimer);
    settingCommitTimer = null;
  };

  // Render SVG only (does not touch spreadsheet DOM)
  const renderChart = (state) => {
    const normalized = normalizeGraphState(state);
    block.classList.toggle("graph-grid-off", normalized.grid === false);
    const captionNode = block.querySelector(".graph-caption-text");
    if (captionNode) captionNode.textContent = normalized.caption || "Graph caption";
    const syncVal = (sel, val) => {
      const el = block.querySelector(sel);
      if (el && document.activeElement !== el) el.value = val;
    };
    syncVal(".graph-input-chart-title", normalized.chartTitle || "");
    syncVal(".graph-input-x-title", normalized.xTitle || "");
    syncVal(".graph-input-y-title", normalized.yTitle || "");
    syncVal(".graph-input-caption", normalized.caption || "");
    syncVal(".graph-input-chart-type", normalizeGraphChartType(normalized.chartType));
    const gt = block.querySelector(".graph-input-grid");
    if (gt) gt.checked = normalized.grid !== false;
    const svg = block.querySelector(".graph-svg");
    const engine = graphEngine();
    if (svg && engine && typeof engine.render === "function") {
      const h = normalized.series.length > 1 ? 340 : 320;
      engine.render(svg, normalized, { width: 620, height: h });
    }
  };

  const commitState = (nextState) => {
    const normalized = alignGraphSeriesToXAxis(nextState);
    writeGraphState(block, normalized);
    renderChart(normalized);
    syncGraphFigureNumbers();
    markDocumentChanged({ deferPageGuides: true });
  };

  // ---- Spreadsheet ----

  const xSpreadsheet = block.querySelector(".graph-spreadsheet[data-axis='x']");
  const ySpreadsheet = block.querySelector(".graph-spreadsheet[data-axis='y']");
  const xGrid = xSpreadsheet ? xSpreadsheet.querySelector(".graph-spreadsheet-grid") : null;
  const yGrid = ySpreadsheet ? ySpreadsheet.querySelector(".graph-spreadsheet-grid") : null;
  const pasteArea = block.querySelector(".graph-paste-area");
  const pasteToggle = block.querySelector("[data-graph-paste='toggle']");
  const pastePanel = block.querySelector(".graph-paste-panel");
  const pasteTextarea = block.querySelector(".graph-table-textarea");
  const applyXButton = block.querySelector("[data-graph-table='apply-x']");
  const applyYButton = block.querySelector("[data-graph-table='apply-y']");

  let commitTimer = null;
  const scheduleCommit = (fn) => {
    if (commitTimer) clearTimeout(commitTimer);
    commitTimer = setTimeout(fn, 220);
  };

  const setPastePanelOpen = (isOpen) => {
    if (!pasteArea || !pasteToggle) return;
    pasteArea.classList.toggle("is-open", isOpen);
    pasteToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  };

  // Build X row
  const buildXGrid = () => {
    if (!xGrid) return;
    const state = readState();
    const isAutoNumbered = state.x.every((value, index) => String(value || "").trim() === String(index + 1));
    xGrid.innerHTML = "";
    state.x.forEach((value, i) => {
      const row = document.createElement("div");
      row.className = "graph-spreadsheet-row";
      const cell = document.createElement("input");
      cell.type = "text";
      cell.className = "graph-cell";
      const normalizedValue = String(value || "").trim();
      cell.value = isAutoNumbered ? "" : normalizedValue;
      cell.placeholder = String(i + 1);
      cell.dataset.row = String(i);
      cell.dataset.col = String(i);
      row.append(cell);
      xGrid.append(row);
    });
  };

  // Build Y table
  const buildYGrid = () => {
    if (!yGrid) return;
    const state = readState();
    yGrid.innerHTML = "";

    const header = document.createElement("div");
    header.className = "graph-spreadsheet-row graph-spreadsheet-row-header";
    const xCorner = document.createElement("span");
    xCorner.className = "graph-cell-header graph-cell-corner";
    xCorner.textContent = "X";
    header.append(xCorner);
    state.series.forEach((series, si) => {
      const seriesName = document.createElement("input");
      seriesName.type = "text";
      seriesName.className = "graph-cell graph-cell-series-name";
      seriesName.value = series.name;
      seriesName.placeholder = "Series " + (si + 1);
      seriesName.dataset.seriesIndex = String(si);
      seriesName.dataset.row = "-1";
      seriesName.dataset.col = String(si);
      header.append(seriesName);
    });
    yGrid.append(header);

    state.x.forEach((xLabel, xi) => {
      const row = document.createElement("div");
      row.className = "graph-spreadsheet-row";
      row.dataset.xIndex = String(xi);

      const xLabelCell = document.createElement("span");
      xLabelCell.className = "graph-cell-header graph-cell-corner graph-cell-x-label";
      xLabelCell.textContent = xLabel || String(xi + 1);
      row.append(xLabelCell);

      state.series.forEach((series, si) => {
        const val = series.values[xi];
        const cell = document.createElement("input");
        cell.type = "text";
        cell.className = "graph-cell";
        cell.value = val == null ? "" : String(val);
        cell.placeholder = "0";
        cell.dataset.row = String(xi);
        cell.dataset.col = String(si);
        cell.dataset.seriesIndex = String(si);
        cell.inputMode = "decimal";
        row.append(cell);
      });
      yGrid.append(row);
    });
  };

  // Read cells → state (preserves empty strings as labels)
  const readXCells = () => {
    if (!xGrid) return null;
    const inputs = Array.from(xGrid.querySelectorAll(".graph-cell"));
    return inputs.map((inp) => inp.value.trim() || inp.placeholder);
  };

  const readYCells = () => {
    if (!yGrid) return null;
    const nameInputs = Array.from(yGrid.querySelectorAll(".graph-cell-series-name"));
    if (nameInputs.length === 0) return null;
    const valueRows = Array.from(yGrid.querySelectorAll(".graph-spreadsheet-row[data-x-index]"));

    return nameInputs.map((nameInput, si) => {
      const name = nameInput.value.trim() || "Series " + (si + 1);
      const values = valueRows.map((row) => {
        const cell = row.querySelector(`.graph-cell[data-series-index="${si}"]`);
        if (!cell) return null;
        const raw = cell.value.trim();
        if (!raw) return null;
        const num = Number(raw);
        return Number.isFinite(num) ? num : null;
      });
      return { name, values };
    });
  };

  // Commit from X grid (debounced during typing, immediate on blur)
  const doCommitX = () => {
    const xVals = readXCells();
    if (!xVals) return;
    const state = readState();
    state.x = xVals;
    commitState(state);
    buildYGrid();
  };

  const doCommitY = () => {
    const series = readYCells();
    if (!series) return;
    const state = readState();
    state.series = series;
    commitState(state);
  };

  // Navigate cells with Tab / Enter / Arrow keys
  const handleCellNav = (event, gridEl) => {
    const cells = Array.from(gridEl.querySelectorAll(".graph-cell"));
    const idx = cells.indexOf(event.target);
    if (idx < 0) return;

    if (event.key === "Tab" || event.key === "Enter") {
      event.preventDefault();
      const dir = event.shiftKey ? -1 : 1;
      const next = idx + dir;
      if (next >= 0 && next < cells.length) {
        cells[next].focus();
        cells[next].select();
      }
      return;
    }

    // Arrow key navigation for Y grid (2D)
    if (gridEl === yGrid && (event.key === "ArrowUp" || event.key === "ArrowDown")) {
      event.preventDefault();
      const row = Number(event.target.dataset.row);
      if (Number.isNaN(row)) return;
      const col = event.target.dataset.col;
      const nextRow = row + (event.key === "ArrowDown" ? 1 : -1);
      const target = gridEl.querySelector(`.graph-cell[data-row="${nextRow}"][data-col="${col}"]`);
      if (target) { target.focus(); target.select(); }
    }
  };

  // Wire X grid
  if (xGrid) {
    buildXGrid();
    xGrid.addEventListener("input", () => scheduleCommit(doCommitX));
    xGrid.addEventListener("focusout", (e) => {
      if (!xGrid.contains(e.relatedTarget)) {
        if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
        doCommitX();
      }
    });
    xGrid.addEventListener("keydown", (e) => handleCellNav(e, xGrid));
  }

  // Wire Y grid
  if (yGrid) {
    buildYGrid();
    yGrid.addEventListener("input", () => scheduleCommit(doCommitY));
    yGrid.addEventListener("focusout", (e) => {
      if (!yGrid.contains(e.relatedTarget)) {
        if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
        doCommitY();
      }
    });
    yGrid.addEventListener("keydown", (e) => handleCellNav(e, yGrid));
  }

  // Add / remove columns
  if (xSpreadsheet) {
    xSpreadsheet.addEventListener("click", (event) => {
      const action = event.target.dataset.spreadsheetAction;
      if (!action) return;
      event.preventDefault();
      if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
      // Read current cells first so we don't lose edits
      const xVals = readXCells() || readState().x;
      const ySeries = readYCells() || readState().series;
      const state = readState();
      state.x = xVals;
      state.series = ySeries;
      if (action === "add-col" || action === "add-point") {
        state.x.push(String(state.x.length + 1));
        state.series.forEach((s) => s.values.push(null));
      } else if ((action === "remove-col" || action === "remove-point") && state.x.length > 1) {
        state.x.pop();
        state.series.forEach((s) => { if (s.values.length > state.x.length) s.values.pop(); });
      }
      commitState(state);
      buildXGrid();
      buildYGrid();
      // Focus the last X cell after add
      if (action === "add-col" || action === "add-point") {
        const cells = xGrid.querySelectorAll(".graph-cell");
        const last = cells[cells.length - 1];
        if (last) { last.focus(); last.select(); }
      }
    });
  }

  // Add / remove series
  if (ySpreadsheet) {
    ySpreadsheet.addEventListener("click", (event) => {
      const action = event.target.dataset.spreadsheetAction;
      if (!action) return;
      event.preventDefault();
      if (commitTimer) { clearTimeout(commitTimer); commitTimer = null; }
      const xVals = readXCells() || readState().x;
      const ySeries = readYCells() || readState().series;
      const state = readState();
      state.x = xVals;
      state.series = ySeries;
      if (action === "add-row" || action === "add-series") {
        state.series.push({ name: "Series " + (state.series.length + 1), values: state.x.map(() => null) });
      } else if ((action === "remove-row" || action === "remove-series") && state.series.length > 1) {
        state.series.pop();
      }
      commitState(state);
      buildYGrid();
      // Focus the name cell of the new row after add
      if (action === "add-row" || action === "add-series") {
        const names = yGrid.querySelectorAll(".graph-cell-series-name");
        const last = names[names.length - 1];
        if (last) { last.focus(); last.select(); }
      }
    });
  }

  // Paste area
  if (pasteToggle && pasteArea) {
    pasteToggle.addEventListener("click", (event) => {
      event.preventDefault();
      const next = !pasteArea.classList.contains("is-open");
      setPastePanelOpen(next);
      if (next && pasteTextarea) {
        pasteTextarea.focus({ preventScroll: true });
      }
    });
  }

  if (pastePanel && pasteTextarea) {
    pasteTextarea.addEventListener("focus", () => {
      if (!pasteArea || !pasteArea.classList.contains("is-open")) {
        setPastePanelOpen(true);
      }
    });
  }

  if (applyXButton && pasteTextarea) {
    applyXButton.addEventListener("click", (event) => {
      event.preventDefault();
      const nextX = parseGraphXTable(pasteTextarea.value);
      if (nextX.length === 0) return;
      const state = readState();
      state.x = nextX;
      commitState(state);
      buildXGrid();
      buildYGrid();
      pasteTextarea.value = "";
      setPastePanelOpen(false);
    });
  }
  if (applyYButton && pasteTextarea) {
    applyYButton.addEventListener("click", (event) => {
      event.preventDefault();
      const state = readState();
      const parsedNumericRows = parseNumericOnlySeriesRows(pasteTextarea.value, state.x.length);

      let nextSeries = parsedNumericRows;
      if (!nextSeries) {
        nextSeries = parseGraphSeriesTable(pasteTextarea.value, state.x.length);
      }
      if (!Array.isArray(nextSeries) || nextSeries.length === 0) return;

      const withNames = promptForSeriesNames(nextSeries, state.series.length, true);
      if (!withNames) return;

      state.series = withNames;
      commitState(state);
      buildYGrid();
      pasteTextarea.value = "";
      setPastePanelOpen(false);
    });
  }

  // Tooltip
  const tooltipEl = block.querySelector(".graph-tooltip");
  const svgEl = block.querySelector(".graph-svg");
  if (tooltipEl && svgEl) {
    svgEl.addEventListener("pointermove", (event) => {
      const target = event.target;
      if (!target || !target.classList || !target.classList.contains("graph-hover-point")) {
        tooltipEl.classList.remove("is-visible");
        return;
      }
      tooltipEl.textContent = (target.getAttribute("data-series") || "") + ": " +
        (target.getAttribute("data-label") || "") + ", " + (target.getAttribute("data-value") || "");
      const rect = svgEl.getBoundingClientRect();
      tooltipEl.style.left = (event.clientX - rect.left) + "px";
      tooltipEl.style.top = (event.clientY - rect.top - 32) + "px";
      tooltipEl.classList.add("is-visible");
    });
    svgEl.addEventListener("pointerleave", () => tooltipEl.classList.remove("is-visible"));
  }

  block.addEventListener("pointerdown", () => activateGraphBlock(block));
  block.addEventListener("focusin", () => activateGraphBlock(block));

  const bindSettingInput = (selector, key) => {
    const el = block.querySelector(selector);
    if (!el) return;
    el.addEventListener("input", () => {
      queueSettingCommit(key, el.value);
    });
    el.addEventListener("change", () => {
      flushSettingCommit();
      const state = readState();
      state[key] = el.value;
      commitState(state);
    });
    el.addEventListener("blur", () => {
      flushSettingCommit();
      const state = readState();
      state[key] = el.value;
      commitState(state);
    });
  };
  bindSettingInput(".graph-input-chart-title", "chartTitle");
  bindSettingInput(".graph-input-x-title", "xTitle");
  bindSettingInput(".graph-input-y-title", "yTitle");
  bindSettingInput(".graph-input-caption", "caption");

  if (chartTypeInput instanceof HTMLSelectElement) {
    const applyChartType = () => {
      flushSettingCommit();
      const state = readState();
      state.chartType = normalizeGraphChartType(chartTypeInput.value);
      commitState(state);
    };
    chartTypeInput.addEventListener("change", applyChartType);
    chartTypeInput.addEventListener("input", applyChartType);
  }

  if (gridToggle) {
    const applyGridToggle = () => {
      const state = readState();
      state.grid = gridToggle.checked;
      commitState(state);
    };
    gridToggle.addEventListener("change", applyGridToggle);
    gridToggle.addEventListener("input", applyGridToggle);
  }

  renderChart(readState());
};

const syncGraphBlocks = (options = {}) => {
  const { rerender = true, renumber = true } = options;
  const selector = rerender ? ".graph-block" : ".graph-block:not([data-graph-bound='true'])";
  const blocks = Array.from(editor.querySelectorAll(selector));
  blocks.forEach((block) => bindGraphBlock(block, { forceRender: rerender }));
  if (renumber) {
    syncGraphFigureNumbers();
  }
  if (activeGraphBlock && !editor.contains(activeGraphBlock)) {
    activeGraphBlock = null;
  }
};

const createGraphBlock = (initialState) => {
  const state = normalizeGraphState(initialState);
  const block = document.createElement("figure");
  block.className = "graph-block";
  block.setAttribute("contenteditable", "false");
  block.setAttribute("tabindex", "0");
  block.setAttribute("draggable", "true");
  block.dataset.graphState = JSON.stringify(state);

  const chartWrap = document.createElement("div");
  chartWrap.className = "graph-chart-wrap";

  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("graph-svg");
  svg.setAttribute("viewBox", "0 0 620 320");
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  svg.setAttribute("aria-label", "Graph");
  chartWrap.append(svg);


  const caption = document.createElement("figcaption");
  caption.className = "graph-caption-line";
  const figureNumber = document.createElement("span");
  figureNumber.className = "graph-figure-number";
  figureNumber.textContent = "Figure 1.";
  const captionText = document.createElement("span");
  captionText.className = "graph-caption-text";
  captionText.textContent = state.caption || "Graph caption";
  caption.append(figureNumber, captionText);

  const tooltip = document.createElement("div");
  tooltip.className = "graph-tooltip";
  chartWrap.append(tooltip);

  const settings = document.createElement("div");
  settings.className = "graph-settings";
  settings.innerHTML = `
    <h3 class="graph-settings-title">Graph</h3>
    <div class="graph-settings-row">
      <label class="graph-setting">
        <span>Chart title</span>
        <input type="text" class="graph-input graph-input-chart-title" placeholder="Enter chart title" />
      </label>
      <label class="graph-setting">
        <span>Caption</span>
        <input type="text" class="graph-input graph-input-caption" placeholder="Enter figure caption" />
      </label>
    </div>
    <div class="graph-settings-row">
      <label class="graph-setting">
        <span>X axis title</span>
        <input type="text" class="graph-input graph-input-x-title" placeholder="X axis label" />
      </label>
      <label class="graph-setting">
        <span>Y axis title</span>
        <input type="text" class="graph-input graph-input-y-title" placeholder="Y axis label" />
      </label>
      <label class="graph-setting">
        <span>Chart type</span>
        <select class="graph-input graph-input-chart-type">
          <option value="line">Line</option>
          <option value="bar">Bar</option>
          <option value="scatter">Scatter</option>
        </select>
      </label>
      <label class="graph-toggle">
        <input type="checkbox" class="graph-input-grid" />
        <span>Grid</span>
      </label>
    </div>
    <div class="graph-spreadsheet" data-axis="x">
      <div class="graph-spreadsheet-header">
        <span class="graph-spreadsheet-title">X Axis Values</span>
        <div class="graph-spreadsheet-actions">
          <button type="button" data-spreadsheet-action="add-point">+ Point</button>
          <button type="button" data-spreadsheet-action="remove-point">&minus; Point</button>
        </div>
      </div>
      <div class="graph-spreadsheet-grid"></div>
    </div>
    <div class="graph-spreadsheet" data-axis="y">
      <div class="graph-spreadsheet-header">
        <span class="graph-spreadsheet-title">Series Data</span>
        <div class="graph-spreadsheet-actions">
          <button type="button" data-spreadsheet-action="add-series">+ Series</button>
          <button type="button" data-spreadsheet-action="remove-series">&minus; Series</button>
        </div>
      </div>
      <div class="graph-spreadsheet-grid"></div>
    </div>
    <div class="graph-paste-area">
      <button type="button" class="graph-paste-toggle" data-graph-paste="toggle" aria-expanded="false">Paste table data</button>
      <div class="graph-paste-panel">
        <textarea class="graph-table-textarea" spellcheck="false" placeholder="Paste CSV data here"></textarea>
        <div class="graph-table-actions">
          <button type="button" data-graph-table="apply-x">Apply as X</button>
          <button type="button" data-graph-table="apply-y">Apply as Series</button>
        </div>
      </div>
    </div>
  `;

  block.append(chartWrap, caption, settings);
  bindGraphBlock(block);
  renderGraphInBlock(block, state);
  return block;
};

const insertGraphBlockAtCaret = (initialState = {}) => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const block = createGraphBlock(initialState);
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";
  const fragment = document.createDocumentFragment();
  fragment.append(block, paragraph);

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  const nextRange = document.createRange();
  nextRange.setStart(paragraph, 0);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);

  syncGraphFigureNumbers();
  activateGraphBlock(block);
  block.scrollIntoView({ block: "center", inline: "nearest" });
  markDocumentChanged();
  return block;
};

const IMAGE_ALIGNMENTS = new Set(["left", "center", "right"]);
const IMAGE_WRAPS = new Set(["break", "left", "right"]);

const normalizeImageAlign = (value) => {
  return IMAGE_ALIGNMENTS.has(value) ? value : "center";
};

const normalizeImageWrap = (value) => {
  return IMAGE_WRAPS.has(value) ? value : "break";
};

const normalizeImageWidth = (value, wrap = "break") => {
  const normalizedWrap = normalizeImageWrap(wrap);
  const fallback = normalizedWrap === "break" ? 78 : 44;
  const min = normalizedWrap === "break" ? 20 : 22;
  const max = normalizedWrap === "break" ? 100 : 70;
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  const clamped = Math.min(max, Math.max(min, numeric));
  const rounded = Math.round(clamped * 2) / 2;
  return Number.isInteger(rounded) ? rounded : Number(rounded.toFixed(1));
};

const fileCaptionFromName = (fileName) => {
  const cleaned = String(fileName || "")
    .replace(/\.[a-z0-9]{1,8}$/i, "")
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return cleaned || "Image caption";
};

const readImageFileAsDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === "string" ? reader.result : "";
      if (!result) {
        reject(new Error("Image file is empty."));
        return;
      }
      resolve(result);
    };
    reader.onerror = () => reject(new Error("Could not read image file."));
    reader.readAsDataURL(file);
  });
};

const isImageFile = (file) => {
  return Boolean(file && typeof file.type === "string" && file.type.toLowerCase().startsWith("image/"));
};

const imageFilesFromDataTransfer = (dataTransfer) => {
  if (!dataTransfer) return [];
  const fromFiles = Array.from(dataTransfer.files || []).filter((file) => isImageFile(file));
  if (fromFiles.length > 0) return fromFiles;
  return Array.from(dataTransfer.items || [])
    .filter((item) => item && item.kind === "file" && typeof item.type === "string" && item.type.startsWith("image/"))
    .map((item) => item.getAsFile())
    .filter((file) => isImageFile(file));
};

const setSelectionFromClientPoint = (clientX, clientY) => {
  const selection = window.getSelection();
  if (!selection) return false;

  let range = null;
  if (typeof document.caretRangeFromPoint === "function") {
    range = document.caretRangeFromPoint(clientX, clientY);
  } else if (typeof document.caretPositionFromPoint === "function") {
    const position = document.caretPositionFromPoint(clientX, clientY);
    if (position && position.offsetNode) {
      range = document.createRange();
      range.setStart(position.offsetNode, position.offset);
      range.collapse(true);
    }
  }

  if (!range) return false;
  const container = range.startContainer;
  const holder = isElementNode(container) ? container : container && container.parentElement;
  if (!holder || !editor.contains(holder)) return false;

  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const readImageState = (block) => {
  const image = block.querySelector(".image-element");
  const captionTextNode = block.querySelector(".image-caption-text");
  const captionInput = block.querySelector(".image-input-caption");
  const wrap = normalizeImageWrap(block.dataset.imageWrap);
  const state = {
    src: image ? String(image.getAttribute("src") || "").trim() : "",
    alt: image ? String(image.getAttribute("alt") || "").trim() : "",
    caption: captionInput
      ? String(captionInput.value || "")
      : captionTextNode
        ? String(captionTextNode.textContent || "")
        : "",
    align: normalizeImageAlign(block.dataset.imageAlign),
    wrap,
    width: normalizeImageWidth(block.dataset.imageWidth, wrap)
  };
  return state;
};

const writeImageState = (block, state) => {
  const wrap = normalizeImageWrap(state.wrap);
  block.dataset.imageAlign = normalizeImageAlign(state.align);
  block.dataset.imageWrap = wrap;
  block.dataset.imageWidth = String(normalizeImageWidth(state.width, wrap));
};

const renderImageInBlock = (block, state) => {
  const current = readImageState(block);
  const merged = {
    ...current,
    ...state
  };
  const wrap = normalizeImageWrap(merged.wrap);
  const normalized = {
    src: String(merged.src || "").trim(),
    alt: String(merged.alt || "").trim(),
    caption: String(merged.caption || "").trim(),
    align: normalizeImageAlign(merged.align),
    wrap,
    width: normalizeImageWidth(merged.width, wrap)
  };

  writeImageState(block, normalized);
  block.style.setProperty("--image-width", `${normalized.width}%`);
  block.classList.toggle("image-wrap-left", normalized.wrap === "left");
  block.classList.toggle("image-wrap-right", normalized.wrap === "right");

  const image = block.querySelector(".image-element");
  if (image) {
    if (normalized.src && image.getAttribute("src") !== normalized.src) {
      image.setAttribute("src", normalized.src);
    }
    image.setAttribute("alt", normalized.alt || "");
  }

  const caption = block.querySelector(".image-caption-text");
  if (caption) {
    caption.textContent = normalized.caption || "Image caption";
  }
  const captionInput = block.querySelector(".image-input-caption");
  if (captionInput && document.activeElement !== captionInput) {
    captionInput.value = normalized.caption || "";
  }

  const widthInput = block.querySelector(".image-input-width");
  const widthValue = block.querySelector(".image-width-value");
  const widthMin = normalized.wrap === "break" ? 20 : 22;
  const widthMax = normalized.wrap === "break" ? 100 : 70;
  if (widthInput) {
    widthInput.min = String(widthMin);
    widthInput.max = String(widthMax);
    widthInput.step = "0.5";
    if (document.activeElement !== widthInput) {
      widthInput.value = String(normalized.width);
    }
  }
  if (widthValue) {
    widthValue.textContent = `${normalized.width}%`;
  }

  block.querySelectorAll("[data-image-align]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.imageAlign === normalized.align);
  });
  block.querySelectorAll("[data-image-wrap]").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.imageWrap === normalized.wrap);
  });

  if (syncFollowingParagraphClearClassForMediaBlock(block, { createIfMissing: false })) {
    scheduleAutoPageBreakGuidesSoft();
  }
};

const deactivateImageBlock = () => {
  if (!activeImageBlock) return;
  activeImageBlock.classList.remove("is-active");
  activeImageBlock = null;
  scheduleAutoPageBreakGuides();
};

const activateImageBlock = (block) => {
  if (!block || !(block instanceof Element) || !block.classList.contains("image-block")) return;
  if (activeGraphBlock) {
    deactivateGraphBlock();
  }
  if (activeImageBlock && activeImageBlock !== block) {
    activeImageBlock.classList.remove("is-active");
  }
  activeImageBlock = block;
  block.classList.add("is-active");
};

const bindImageBlock = (block, options = {}) => {
  if (!block || !(block instanceof Element) || !block.classList.contains("image-block")) return;
  const shouldRender = options.forceRender !== false;
  block.setAttribute("contenteditable", "false");
  block.setAttribute("tabindex", "0");
  block.setAttribute("draggable", "true");

  if (imageBoundBlocks.has(block)) {
    if (shouldRender) {
      renderImageInBlock(block, readImageState(block));
    }
    return;
  }

  const commitState = (partial) => {
    if (!editor.contains(block)) return;
    const next = {
      ...readImageState(block),
      ...partial
    };
    renderImageInBlock(block, next);
    syncGraphFigureNumbers();
    markDocumentChanged({ deferPageGuides: true });
  };

  let pendingPartialState = null;
  let settingsCommitTimer = null;
  const queueCommitState = (partial) => {
    pendingPartialState = {
      ...(pendingPartialState || {}),
      ...partial
    };
    if (settingsCommitTimer) {
      clearTimeout(settingsCommitTimer);
    }
    settingsCommitTimer = setTimeout(() => {
      settingsCommitTimer = null;
      const nextPartial = pendingPartialState;
      pendingPartialState = null;
      if (!nextPartial) return;
      commitState(nextPartial);
    }, 100);
  };
  const flushQueuedCommitState = () => {
    if (!settingsCommitTimer) return;
    clearTimeout(settingsCommitTimer);
    settingsCommitTimer = null;
    const nextPartial = pendingPartialState;
    pendingPartialState = null;
    if (!nextPartial) return;
    commitState(nextPartial);
  };
  let pendingPreviewWidth = null;
  let previewFrame = 0;
  let widthCommitTimer = null;
  const cancelWidthPreviewFrame = () => {
    if (!previewFrame) return;
    window.cancelAnimationFrame(previewFrame);
    previewFrame = 0;
  };
  const applyPreviewWidth = () => {
    if (!editor.contains(block)) return;
    const wrap = normalizeImageWrap(block.dataset.imageWrap);
    const width = normalizeImageWidth(pendingPreviewWidth, wrap);
    block.style.setProperty("--image-width", `${width}%`);
    const widthValue = block.querySelector(".image-width-value");
    if (widthValue) {
      widthValue.textContent = `${width}%`;
    }
    scheduleAutoPageBreakGuidesSoft();
  };
  const schedulePreviewWidth = (value) => {
    pendingPreviewWidth = value;
    if (previewFrame) return;
    previewFrame = window.requestAnimationFrame(() => {
      previewFrame = 0;
      applyPreviewWidth();
    });
  };
  const commitWidthFromControl = (widthControl) => {
    if (!(widthControl instanceof HTMLInputElement)) return;
    if (!editor.contains(block)) return;
    if (widthCommitTimer) {
      clearTimeout(widthCommitTimer);
      widthCommitTimer = null;
    }
    cancelWidthPreviewFrame();
    pendingPreviewWidth = null;
    const wrap = normalizeImageWrap(block.dataset.imageWrap);
    const nextWidth = normalizeImageWidth(widthControl.value, wrap);
    const currentWidth = normalizeImageWidth(block.dataset.imageWidth, wrap);
    if (nextWidth === currentWidth) {
      renderImageInBlock(block, readImageState(block));
      scheduleAutoPageBreakGuidesSoft();
      return;
    }
    commitState({ width: nextWidth });
  };
  const scheduleWidthCommit = (widthControl) => {
    if (!(widthControl instanceof HTMLInputElement)) return;
    if (widthCommitTimer) {
      clearTimeout(widthCommitTimer);
    }
    widthCommitTimer = setTimeout(() => {
      widthCommitTimer = null;
      commitWidthFromControl(widthControl);
    }, 180);
  };
  const flushWidthCommit = (widthControl) => {
    if (!(widthControl instanceof HTMLInputElement)) return;
    if (widthCommitTimer) {
      clearTimeout(widthCommitTimer);
      widthCommitTimer = null;
    }
    commitWidthFromControl(widthControl);
  };

  imageBoundBlocks.add(block);
  block.dataset.imageBound = "true";
  renderImageInBlock(block, readImageState(block));

  block.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (!target.closest(".image-settings")) return;
    event.stopPropagation();
  });

  const captionInput = block.querySelector(".image-input-caption");
  if (captionInput) {
    captionInput.addEventListener("input", () => {
      queueCommitState({ caption: captionInput.value });
    });
    captionInput.addEventListener("blur", () => {
      flushQueuedCommitState();
      commitState({ caption: captionInput.value });
    });
  }

  const widthInput = block.querySelector(".image-input-width");
  if (widthInput) {
    widthInput.addEventListener("input", () => {
      schedulePreviewWidth(widthInput.value);
      scheduleWidthCommit(widthInput);
    });
    widthInput.addEventListener("change", () => {
      flushWidthCommit(widthInput);
    });
    widthInput.addEventListener("pointerup", () => {
      flushWidthCommit(widthInput);
    });
    widthInput.addEventListener("blur", () => {
      flushWidthCommit(widthInput);
    });
  }

  block.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;

    flushWidthCommit(widthInput);
    flushQueuedCommitState();

    const alignButton = target.closest("[data-image-align]");
    if (alignButton) {
      event.preventDefault();
      commitState({ align: alignButton.dataset.imageAlign });
      return;
    }

    const wrapButton = target.closest("[data-image-wrap]");
    if (wrapButton) {
      event.preventDefault();
      commitState({ wrap: wrapButton.dataset.imageWrap });
      return;
    }

    const actionButton = target.closest("[data-image-action]");
    if (!actionButton) return;
    event.preventDefault();
    const action = actionButton.dataset.imageAction;

    if (action === "remove") {
      if (activeImageBlock === block) {
        deactivateImageBlock();
      }
      block.remove();
      syncGraphFigureNumbers();
      markDocumentChanged();
      focusEditorAtEnd();
      return;
    }

    if (action === "replace") {
      const picker = document.createElement("input");
      picker.type = "file";
      picker.accept = "image/*";
      picker.style.display = "none";
      document.body.append(picker);
      picker.addEventListener(
        "change",
        async () => {
          const file = picker.files && picker.files[0];
          picker.remove();
          if (!file || !isImageFile(file)) return;
          try {
            const src = await readImageFileAsDataUrl(file);
            if (!editor.contains(block)) return;
            const previous = readImageState(block);
            const nextCaption =
              previous.caption && previous.caption !== "Image caption"
                ? previous.caption
                : fileCaptionFromName(file.name);
            commitState({
              src,
              alt: file.name || previous.alt,
              caption: nextCaption
            });
          } catch {
            // Ignore replacement failures.
          }
        },
        { once: true }
      );
      picker.click();
    }
  });

  block.addEventListener("pointerdown", () => activateImageBlock(block));
  block.addEventListener("focusin", () => activateImageBlock(block));
};

const syncImageBlocks = (options = {}) => {
  const { rerender = true, renumber = true } = options;
  const selector = rerender ? ".image-block" : ".image-block:not([data-image-bound='true'])";
  const blocks = Array.from(editor.querySelectorAll(selector));
  blocks.forEach((block) => bindImageBlock(block, { forceRender: rerender }));
  if (renumber) {
    syncGraphFigureNumbers();
  }
  if (activeImageBlock && !editor.contains(activeImageBlock)) {
    activeImageBlock = null;
  }
};

const scheduleMediaBlockSync = (renumber = false) => {
  mediaSyncNeedsRenumber = mediaSyncNeedsRenumber || Boolean(renumber);
  if (mediaSyncFrame) return;

  mediaSyncFrame = window.requestAnimationFrame(() => {
    mediaSyncFrame = 0;
    const shouldRenumber = mediaSyncNeedsRenumber;
    mediaSyncNeedsRenumber = false;
    syncGraphBlocks({ rerender: false, renumber: false });
    syncImageBlocks({ rerender: false, renumber: false });
    if (shouldRenumber) {
      syncGraphFigureNumbers();
    }
  });
};

const createImageBlock = (initialState = {}) => {
  const state = {
    src: String(initialState.src || "").trim(),
    alt: String(initialState.alt || "").trim(),
    caption: String(initialState.caption || "").trim(),
    align: normalizeImageAlign(initialState.align),
    wrap: normalizeImageWrap(initialState.wrap),
    width: normalizeImageWidth(initialState.width, normalizeImageWrap(initialState.wrap))
  };

  if (!state.src) return null;

  const block = document.createElement("figure");
  block.className = "image-block";
  block.setAttribute("contenteditable", "false");
  block.setAttribute("tabindex", "0");
  block.setAttribute("draggable", "true");
  block.dataset.imageAlign = state.align;
  block.dataset.imageWrap = state.wrap;
  block.dataset.imageWidth = String(state.width);

  const mediaWrap = document.createElement("div");
  mediaWrap.className = "image-media-wrap";

  const image = document.createElement("img");
  image.className = "image-element";
  image.loading = "lazy";
  image.decoding = "async";
  image.draggable = false;
  image.src = state.src;
  image.alt = state.alt || "";
  mediaWrap.append(image);

  const caption = document.createElement("figcaption");
  caption.className = "image-caption-line";
  const figureNumber = document.createElement("span");
  figureNumber.className = "image-figure-number";
  figureNumber.textContent = "Figure 1.";
  const captionText = document.createElement("span");
  captionText.className = "image-caption-text";
  captionText.textContent = state.caption || "Image caption";
  caption.append(figureNumber, captionText);

  const settings = document.createElement("div");
  settings.className = "image-settings";
  settings.innerHTML = `
    <h3 class="image-settings-title">Image</h3>
    <div class="image-settings-row">
      <label class="image-setting image-setting-wide">
        <span>Caption</span>
        <input type="text" class="image-input image-input-caption" placeholder="Enter figure caption" />
      </label>
    </div>
    <div class="image-settings-row">
      <div class="image-button-group">
        <span>Align</span>
        <button type="button" class="image-choice" data-image-align="left">Left</button>
        <button type="button" class="image-choice" data-image-align="center">Center</button>
        <button type="button" class="image-choice" data-image-align="right">Right</button>
      </div>
      <div class="image-button-group">
        <span>Wrap</span>
        <button type="button" class="image-choice" data-image-wrap="break">Block</button>
        <button type="button" class="image-choice" data-image-wrap="left">Left</button>
        <button type="button" class="image-choice" data-image-wrap="right">Right</button>
      </div>
      <label class="image-setting image-setting-width">
        <span class="image-width-label">Width</span>
        <input type="range" class="image-input-width" min="20" max="100" step="0.5" />
        <span class="image-width-value">78%</span>
      </label>
    </div>
    <div class="image-settings-row image-settings-actions">
      <button type="button" class="image-action-btn" data-image-action="replace">Replace</button>
      <button type="button" class="image-action-btn" data-image-action="remove">Remove</button>
    </div>
  `;

  block.append(mediaWrap, caption, settings);
  bindImageBlock(block);
  renderImageInBlock(block, state);
  return block;
};

const insertImageBlockAtCaret = (initialState = {}) => {
  const selection = window.getSelection();
  if (!selection) return null;

  const node = getSelectionNode();
  const holder = isElementNode(node) ? node : node && node.parentElement;
  if (!holder || !editor.contains(holder)) {
    ensureSelectionInEditor();
  }

  const activeSelection = window.getSelection();
  if (!activeSelection || activeSelection.rangeCount === 0) return null;
  const block = createImageBlock(initialState);
  if (!block) return null;

  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";
  const fragment = document.createDocumentFragment();
  fragment.append(block, paragraph);

  const range = activeSelection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  const nextRange = document.createRange();
  nextRange.setStart(paragraph, 0);
  nextRange.collapse(true);
  activeSelection.removeAllRanges();
  activeSelection.addRange(nextRange);

  syncFollowingParagraphClearClassForMediaBlock(block, { createIfMissing: true });
  syncGraphFigureNumbers();
  activateImageBlock(block);
  block.scrollIntoView({ block: "center", inline: "nearest" });
  markDocumentChanged();
  return block;
};

const insertImageFilesAtSelection = async (files, options = {}) => {
  const imageFiles = Array.from(files || []).filter((file) => isImageFile(file));
  if (imageFiles.length === 0) return 0;

  closeInlineCommandMenu();
  closeMenuAndReset();
  deactivateGraphBlock();
  deactivateImageBlock();

  if (Number.isFinite(options.clientX) && Number.isFinite(options.clientY)) {
    setSelectionFromClientPoint(options.clientX, options.clientY);
  }
  if (!isInsideEditableSurface(getSelectionNode())) {
    focusEditorAtEnd();
  }

  let insertedCount = 0;
  for (const file of imageFiles) {
    try {
      const src = await readImageFileAsDataUrl(file);
      const caption = fileCaptionFromName(file.name);
      const inserted = insertImageBlockAtCaret({
        src,
        alt: file.name || "",
        caption,
        align: "center",
        wrap: "break",
        width: 78
      });
      if (inserted) {
        insertedCount += 1;
      }
    } catch {
      // Skip unreadable image files.
    }
  }

  return insertedCount;
};

const promptInsertImageFromPicker = async () => {
  const picker = document.createElement("input");
  picker.type = "file";
  picker.accept = "image/*";
  picker.multiple = true;
  picker.style.display = "none";
  document.body.append(picker);

  const selectionRange = captureCurrentSelectionRange(editor);
  const files = await new Promise((resolve) => {
    picker.addEventListener(
      "change",
      () => {
        const selected = Array.from(picker.files || []);
        picker.remove();
        resolve(selected);
      },
      { once: true }
    );
    picker.click();
  });

  if (!Array.isArray(files) || files.length === 0) return;
  if (selectionRange) {
    restoreSelectionRange(selectionRange);
  }
  await insertImageFilesAtSelection(files);
};

const normalizeMediaStorageImageState = (value = {}) => {
  const wrap = normalizeImageWrap(value.wrap);
  return {
    src: String(value.src || "").trim(),
    alt: String(value.alt || "").trim(),
    caption: String(value.caption || "").trim(),
    align: normalizeImageAlign(value.align),
    wrap,
    width: normalizeImageWidth(value.width, wrap)
  };
};

const MEDIA_STORAGE_TABLE_MAX_ROWS = 48;
const MEDIA_STORAGE_TABLE_MAX_COLS = 20;

const normalizeMediaStorageTableState = (value = {}) => {
  const sourceRows = Array.isArray(value.rows) ? value.rows : [];
  let rows = sourceRows
    .filter((row) => Array.isArray(row))
    .map((row) => row.slice(0, MEDIA_STORAGE_TABLE_MAX_COLS).map((cell) => String(cell == null ? "" : cell)));

  if (rows.length === 0) {
    rows = [
      ["Header 1", "Header 2", "Header 3"],
      ["", "", ""]
    ];
  }

  rows = rows.slice(0, MEDIA_STORAGE_TABLE_MAX_ROWS);
  const widest = rows.reduce((max, row) => Math.max(max, row.length), 0);
  const columnCount = Math.max(2, Math.min(MEDIA_STORAGE_TABLE_MAX_COLS, widest || 0));
  rows = rows.map((row) => {
    const output = row.slice(0, columnCount);
    while (output.length < columnCount) {
      output.push("");
    }
    return output;
  });
  while (rows.length < 2) {
    rows.push(Array.from({ length: columnCount }, () => ""));
  }

  return {
    caption: String(value.caption || "").trim() || "Table caption",
    rows
  };
};

const readTableStateFromLiveDom = (table) => {
  if (!(table instanceof HTMLTableElement)) {
    return normalizeMediaStorageTableState();
  }
  const captionNode = table.querySelector("caption");
  const caption = String(captionNode ? captionNode.textContent || "" : "").replace(/\s+/g, " ").trim() || "Table caption";
  const rows = Array.from(table.rows)
    .filter((row) => row instanceof HTMLTableRowElement)
    .map((row) =>
      Array.from(row.cells).map((cell) => {
        const raw = String(cell.textContent || "").replace(/\u00a0/g, " ");
        return raw.replace(/\s+/g, " ").trim();
      })
    );
  return normalizeMediaStorageTableState({ caption, rows });
};

const buildMediaStorageTableText = (state) => {
  const normalized = normalizeMediaStorageTableState(state);
  return normalized.rows.map((row) => row.join("\t")).join("\n");
};

const parseMediaStorageTableText = (text, fallbackState = {}) => {
  const fallback = normalizeMediaStorageTableState(fallbackState);
  const lines = String(text || "")
    .replace(/\r\n?/g, "\n")
    .split("\n")
    .map((line) => line.trimEnd());
  const meaningful = lines.filter((line) => line.trim().length > 0);
  if (meaningful.length === 0) {
    return fallback;
  }

  const rows = meaningful.map((line) => {
    if (line.includes("\t")) {
      return line.split("\t").map((cell) => cell.trim());
    }
    return line.split(",").map((cell) => cell.trim());
  });
  return normalizeMediaStorageTableState({
    caption: fallback.caption,
    rows
  });
};

const normalizeMediaStorageEntry = (value) => {
  if (!value || typeof value !== "object") return null;
  const kind = String(value.kind || "").trim().toLowerCase();
  if (kind === "graph") {
    return {
      kind: "graph",
      graphState: normalizeGraphState(value.graphState || value.state || value.data || {})
    };
  }
  if (kind === "image") {
    const imageState = normalizeMediaStorageImageState(value.imageState || value.state || value.data || value);
    if (!imageState.src) return null;
    return {
      kind: "image",
      imageState
    };
  }
  if (kind === "table") {
    return {
      kind: "table",
      tableState: normalizeMediaStorageTableState(value.tableState || value.state || value.data || value)
    };
  }
  return null;
};

const normalizeMediaStorageSlots = (value) => {
  const output = emptyMediaSlots();
  const source = Array.isArray(value) ? value : value && Array.isArray(value.slots) ? value.slots : [];
  source.slice(0, MEDIA_STORAGE_SLOT_LIMIT).forEach((entry, index) => {
    output[index] = normalizeMediaStorageEntry(entry);
  });
  return output;
};

const loadGlobalMediaStorageSlots = () => {
  try {
    const raw = localStorage.getItem(MEDIA_STORAGE_GLOBAL_KEY);
    if (!raw) return emptyMediaSlots();
    const parsed = JSON.parse(raw);
    return normalizeMediaStorageSlots(parsed);
  } catch {
    return emptyMediaSlots();
  }
};

const persistGlobalMediaStorageSlots = (slots) => {
  try {
    localStorage.setItem(MEDIA_STORAGE_GLOBAL_KEY, JSON.stringify(normalizeMediaStorageSlots(slots)));
  } catch {
    // Ignore quota/storage errors.
  }
};

const snapshotMediaStorageSlots = () => {
  return mediaStorageSlots.map((entry) => {
    if (!entry) return null;
    if (entry.kind === "graph") {
      return {
        kind: "graph",
        graphState: normalizeGraphState(entry.graphState)
      };
    }
    if (entry.kind === "image") {
      return {
        kind: "image",
        imageState: normalizeMediaStorageImageState(entry.imageState)
      };
    }
    if (entry.kind === "table") {
      return {
        kind: "table",
        tableState: normalizeMediaStorageTableState(entry.tableState)
      };
    }
    return null;
  });
};

const clearMediaStoragePersistTimer = () => {
  if (!mediaStoragePersistTimer) return;
  clearTimeout(mediaStoragePersistTimer);
  mediaStoragePersistTimer = null;
};

const persistMediaStorageStateNow = () => {
  clearMediaStoragePersistTimer();
  const snapshot = snapshotMediaStorageSlots();
  setFeatureState("mediaStorage", snapshot);
  persistGlobalMediaStorageSlots(snapshot);
};

const scheduleMediaStoragePersist = () => {
  clearMediaStoragePersistTimer();
  mediaStoragePersistTimer = setTimeout(() => {
    mediaStoragePersistTimer = null;
    const snapshot = snapshotMediaStorageSlots();
    setFeatureState("mediaStorage", snapshot);
    persistGlobalMediaStorageSlots(snapshot);
  }, 140);
};

const mediaStorageSlotIndexFromNode = (node) => {
  const element = node instanceof Element ? node : null;
  if (!element) return -1;
  const slot = element.closest(".media-storage-slot");
  if (!(slot instanceof HTMLElement)) return -1;
  const raw = Number(slot.dataset.slotIndex || "-1");
  if (!Number.isFinite(raw)) return -1;
  const index = Math.floor(raw);
  if (index < 0 || index >= MEDIA_STORAGE_SLOT_LIMIT) return -1;
  return index;
};

const clearMediaStorageDropTargets = () => {
  if (!mediaStorageList) return;
  mediaStorageList.querySelectorAll(".media-storage-slot.is-drop-target").forEach((slot) => {
    slot.classList.remove("is-drop-target");
  });
};

const resolveMediaStorageDropSlotIndex = (target, clientY = null) => {
  if (!mediaStorageList) return -1;
  const element = target instanceof Element ? target : null;
  if (element) {
    const directIndex = mediaStorageSlotIndexFromNode(element);
    if (directIndex >= 0) return directIndex;
  }

  const slotNodes = Array.from(mediaStorageList.querySelectorAll(".media-storage-slot"));
  if (slotNodes.length === 0) return -1;

  if (Number.isFinite(clientY)) {
    let bestIndex = -1;
    let bestDistance = Number.POSITIVE_INFINITY;
    slotNodes.forEach((slotNode) => {
      if (!(slotNode instanceof HTMLElement)) return;
      const rect = slotNode.getBoundingClientRect();
      const centerY = rect.top + rect.height * 0.5;
      const distance = Math.abs(centerY - Number(clientY));
      if (distance < bestDistance) {
        bestDistance = distance;
        const index = mediaStorageSlotIndexFromNode(slotNode);
        if (index >= 0) {
          bestIndex = index;
        }
      }
    });
    if (bestIndex >= 0) return bestIndex;
  }

  const firstEmpty = mediaStorageSlots.findIndex((entry) => !entry);
  if (firstEmpty >= 0) return firstEmpty;
  return 0;
};

const renderMediaStorageGraphPreview = (svg, state) => {
  if (!(svg instanceof SVGElement)) return;
  const normalized = normalizeGraphState(state);
  const engine = graphEngine();
  if (engine && typeof engine.render === "function") {
    const chartHeight = normalized.series.length > 1 ? 280 : 240;
    engine.render(svg, normalized, { width: 620, height: chartHeight });
    return;
  }
  svg.innerHTML = "";
  const ns = "http://www.w3.org/2000/svg";
  const text = document.createElementNS(ns, "text");
  text.setAttribute("x", "310");
  text.setAttribute("y", "140");
  text.setAttribute("text-anchor", "middle");
  text.setAttribute("font-size", "14");
  text.setAttribute("fill", "#000");
  text.textContent = "Graph preview unavailable";
  svg.append(text);
};

const buildMediaStorageGraphSeriesText = (state) => {
  const normalized = normalizeGraphState(state);
  return normalized.series
    .map((series, index) => {
      const name = String(series && series.name ? series.name : "").trim() || `Series ${index + 1}`;
      const values = Array.isArray(series && series.values) ? series.values : [];
      return [name, ...values.map((value) => (value == null ? "" : String(value)))].join(", ");
    })
    .join("\n");
};

const buildMediaStorageSlotCard = (slot, index) => {
  const card = document.createElement("section");
  card.className = "media-storage-slot";
  card.dataset.slotIndex = String(index);

  const head = document.createElement("div");
  head.className = "media-storage-slot-head";
  const label = document.createElement("span");
  label.className = "media-storage-slot-label";
  label.textContent = `Slot ${index + 1}`;
  const kind = document.createElement("span");
  kind.className = "media-storage-slot-kind";
  kind.textContent = slot ? (slot.kind === "graph" ? "Graph" : slot.kind === "table" ? "Table" : "Image") : "Empty";
  head.append(label, kind);
  card.append(head);

  const controls = document.createElement("div");
  controls.className = "media-storage-controls";
  const insertButton = document.createElement("button");
  insertButton.type = "button";
  insertButton.className = "media-storage-button";
  insertButton.dataset.storageAction = "insert";
  insertButton.textContent = "Insert";
  insertButton.disabled = !slot;
  const clearButton = document.createElement("button");
  clearButton.type = "button";
  clearButton.className = "media-storage-button";
  clearButton.dataset.storageAction = "clear";
  clearButton.textContent = "Clear";
  clearButton.disabled = !slot;
  controls.append(insertButton, clearButton);

  if (!slot) {
    const empty = document.createElement("div");
    empty.className = "media-storage-slot-empty";
    empty.textContent = "Drag a graph, image, or table here.";
    card.append(empty, controls);
    return card;
  }

  if (slot.kind === "graph") {
    const graphState = normalizeGraphState(slot.graphState);
    slot.graphState = graphState;

    const preview = document.createElement("div");
    preview.className = "media-storage-preview";
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.classList.add("media-storage-graph-svg");
    svg.setAttribute("viewBox", "0 0 620 320");
    svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
    preview.append(svg);
    renderMediaStorageGraphPreview(svg, graphState);

    const config = document.createElement("div");
    config.className = "media-storage-config";

    const chartTitleField = document.createElement("label");
    chartTitleField.className = "media-storage-field";
    chartTitleField.innerHTML = "<span>Chart title</span>";
    const chartTitleInput = document.createElement("input");
    chartTitleInput.type = "text";
    chartTitleInput.className = "media-storage-input";
    chartTitleInput.dataset.storageField = "graph-chart-title";
    chartTitleInput.value = graphState.chartTitle || "";
    chartTitleField.append(chartTitleInput);

    const captionField = document.createElement("label");
    captionField.className = "media-storage-field";
    captionField.innerHTML = "<span>Caption</span>";
    const captionInput = document.createElement("input");
    captionInput.type = "text";
    captionInput.className = "media-storage-input";
    captionInput.dataset.storageField = "graph-caption";
    captionInput.value = graphState.caption || "";
    captionField.append(captionInput);

    const xTitleField = document.createElement("label");
    xTitleField.className = "media-storage-field";
    xTitleField.innerHTML = "<span>X axis title</span>";
    const xTitleInput = document.createElement("input");
    xTitleInput.type = "text";
    xTitleInput.className = "media-storage-input";
    xTitleInput.dataset.storageField = "graph-x-title";
    xTitleInput.value = graphState.xTitle || "";
    xTitleField.append(xTitleInput);

    const yTitleField = document.createElement("label");
    yTitleField.className = "media-storage-field";
    yTitleField.innerHTML = "<span>Y axis title</span>";
    const yTitleInput = document.createElement("input");
    yTitleInput.type = "text";
    yTitleInput.className = "media-storage-input";
    yTitleInput.dataset.storageField = "graph-y-title";
    yTitleInput.value = graphState.yTitle || "";
    yTitleField.append(yTitleInput);

    const chartTypeField = document.createElement("label");
    chartTypeField.className = "media-storage-field";
    chartTypeField.innerHTML = "<span>Chart type</span>";
    const chartTypeSelect = document.createElement("select");
    chartTypeSelect.className = "media-storage-select";
    chartTypeSelect.dataset.storageField = "graph-chart-type";
    [
      ["line", "Line"],
      ["bar", "Bar"],
      ["scatter", "Scatter"]
    ].forEach(([value, labelText]) => {
      const option = document.createElement("option");
      option.value = value;
      option.textContent = labelText;
      chartTypeSelect.append(option);
    });
    chartTypeSelect.value = normalizeGraphChartType(graphState.chartType);
    chartTypeField.append(chartTypeSelect);

    const gridField = document.createElement("label");
    gridField.className = "media-storage-field";
    gridField.innerHTML = "<span>Grid</span>";
    const gridInput = document.createElement("input");
    gridInput.type = "checkbox";
    gridInput.className = "media-storage-input";
    gridInput.dataset.storageField = "graph-grid";
    gridInput.checked = graphState.grid !== false;
    gridField.append(gridInput);

    const xValuesField = document.createElement("label");
    xValuesField.className = "media-storage-field";
    xValuesField.innerHTML = "<span>X values (comma, tab, or newline)</span>";
    const xValuesArea = document.createElement("textarea");
    xValuesArea.className = "media-storage-textarea";
    xValuesArea.dataset.storageField = "graph-x-values";
    xValuesArea.value = graphState.x.join(", ");
    xValuesField.append(xValuesArea);

    const seriesField = document.createElement("label");
    seriesField.className = "media-storage-field";
    seriesField.innerHTML = "<span>Series rows (Name, v1, v2, ...)</span>";
    const seriesArea = document.createElement("textarea");
    seriesArea.className = "media-storage-textarea";
    seriesArea.dataset.storageField = "graph-series-values";
    seriesArea.value = buildMediaStorageGraphSeriesText(graphState);
    seriesField.append(seriesArea);

    const applyDataRow = document.createElement("div");
    applyDataRow.className = "media-storage-action-row";
    const applyDataButton = document.createElement("button");
    applyDataButton.type = "button";
    applyDataButton.className = "media-storage-button";
    applyDataButton.dataset.storageAction = "apply-graph-data";
    applyDataButton.textContent = "Apply Data";
    applyDataRow.append(applyDataButton);

    config.append(
      chartTitleField,
      captionField,
      xTitleField,
      yTitleField,
      chartTypeField,
      gridField,
      xValuesField,
      seriesField,
      applyDataRow
    );
    card.append(preview, controls, config);
    return card;
  }

  if (slot.kind === "table") {
    const tableState = normalizeMediaStorageTableState(slot.tableState);
    slot.tableState = tableState;

    const preview = document.createElement("div");
    preview.className = "media-storage-preview";
    const previewTable = document.createElement("table");
    previewTable.className = "media-storage-table-preview";
    const previewRows = tableState.rows.slice(0, 4);
    previewRows.forEach((row, rowIndex) => {
      const rowNode = document.createElement("tr");
      row.forEach((value) => {
        const cell = document.createElement(rowIndex === 0 ? "th" : "td");
        cell.textContent = value;
        rowNode.append(cell);
      });
      previewTable.append(rowNode);
    });
    preview.append(previewTable);

    const config = document.createElement("div");
    config.className = "media-storage-config";

    const captionField = document.createElement("label");
    captionField.className = "media-storage-field";
    captionField.innerHTML = "<span>Caption</span>";
    const captionInput = document.createElement("input");
    captionInput.type = "text";
    captionInput.className = "media-storage-input";
    captionInput.dataset.storageField = "table-caption";
    captionInput.value = tableState.caption;
    captionField.append(captionInput);

    const dataField = document.createElement("label");
    dataField.className = "media-storage-field";
    dataField.innerHTML = "<span>Rows (tab or comma separated)</span>";
    const dataArea = document.createElement("textarea");
    dataArea.className = "media-storage-textarea";
    dataArea.dataset.storageField = "table-rows";
    dataArea.value = buildMediaStorageTableText(tableState);
    dataField.append(dataArea);

    const actionRow = document.createElement("div");
    actionRow.className = "media-storage-action-row";
    const applyButton = document.createElement("button");
    applyButton.type = "button";
    applyButton.className = "media-storage-button";
    applyButton.dataset.storageAction = "apply-table-data";
    applyButton.textContent = "Apply Data";
    actionRow.append(applyButton);

    config.append(captionField, dataField, actionRow);
    card.append(preview, controls, config);
    return card;
  }

  const imageState = normalizeMediaStorageImageState(slot.imageState);
  slot.imageState = imageState;

  const preview = document.createElement("div");
  preview.className = "media-storage-preview";
  const img = document.createElement("img");
  img.className = "media-storage-image-preview";
  img.src = imageState.src;
  img.alt = imageState.alt || "";
  preview.append(img);

  const config = document.createElement("div");
  config.className = "media-storage-config";

  const captionField = document.createElement("label");
  captionField.className = "media-storage-field";
  captionField.innerHTML = "<span>Caption</span>";
  const captionInput = document.createElement("input");
  captionInput.type = "text";
  captionInput.className = "media-storage-input";
  captionInput.dataset.storageField = "image-caption";
  captionInput.value = imageState.caption || "";
  captionField.append(captionInput);

  const altField = document.createElement("label");
  altField.className = "media-storage-field";
  altField.innerHTML = "<span>Alt text</span>";
  const altInput = document.createElement("input");
  altInput.type = "text";
  altInput.className = "media-storage-input";
  altInput.dataset.storageField = "image-alt";
  altInput.value = imageState.alt || "";
  altField.append(altInput);

  const alignField = document.createElement("label");
  alignField.className = "media-storage-field";
  alignField.innerHTML = "<span>Align</span>";
  const alignSelect = document.createElement("select");
  alignSelect.className = "media-storage-select";
  alignSelect.dataset.storageField = "image-align";
  [
    ["left", "Left"],
    ["center", "Center"],
    ["right", "Right"]
  ].forEach(([value, labelText]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelText;
    alignSelect.append(option);
  });
  alignSelect.value = imageState.align;
  alignField.append(alignSelect);

  const wrapField = document.createElement("label");
  wrapField.className = "media-storage-field";
  wrapField.innerHTML = "<span>Wrap</span>";
  const wrapSelect = document.createElement("select");
  wrapSelect.className = "media-storage-select";
  wrapSelect.dataset.storageField = "image-wrap";
  [
    ["break", "Block"],
    ["left", "Left"],
    ["right", "Right"]
  ].forEach(([value, labelText]) => {
    const option = document.createElement("option");
    option.value = value;
    option.textContent = labelText;
    wrapSelect.append(option);
  });
  wrapSelect.value = imageState.wrap;
  wrapField.append(wrapSelect);

  const widthMin = imageState.wrap === "break" ? 20 : 22;
  const widthMax = imageState.wrap === "break" ? 100 : 70;
  const widthField = document.createElement("label");
  widthField.className = "media-storage-field";
  widthField.innerHTML = "<span>Width</span>";
  const widthRow = document.createElement("div");
  widthRow.className = "media-storage-range-row";
  const widthInput = document.createElement("input");
  widthInput.type = "range";
  widthInput.className = "media-storage-range";
  widthInput.dataset.storageField = "image-width";
  widthInput.min = String(widthMin);
  widthInput.max = String(widthMax);
  widthInput.step = "0.5";
  widthInput.value = String(imageState.width);
  const widthValue = document.createElement("span");
  widthValue.className = "media-storage-range-value";
  widthValue.textContent = `${imageState.width}%`;
  widthRow.append(widthInput, widthValue);
  widthField.append(widthRow);

  const imageActionRow = document.createElement("div");
  imageActionRow.className = "media-storage-action-row";
  const replaceButton = document.createElement("button");
  replaceButton.type = "button";
  replaceButton.className = "media-storage-button";
  replaceButton.dataset.storageAction = "replace-image";
  replaceButton.textContent = "Replace Image";
  imageActionRow.append(replaceButton);

  config.append(captionField, altField, alignField, wrapField, widthField, imageActionRow);
  card.append(preview, controls, config);
  return card;
};

const renderMediaStorageSidebar = () => {
  if (!mediaStorageList) return;
  mediaStorageSlots = normalizeMediaStorageSlots(mediaStorageSlots);
  const fragment = document.createDocumentFragment();
  for (let index = 0; index < MEDIA_STORAGE_SLOT_LIMIT; index += 1) {
    fragment.append(buildMediaStorageSlotCard(mediaStorageSlots[index], index));
  }
  mediaStorageList.replaceChildren(fragment);
};

const setMediaStorageSlot = (slotIndex, entry, options = {}) => {
  if (!Number.isFinite(slotIndex)) return false;
  const index = Math.floor(slotIndex);
  if (index < 0 || index >= MEDIA_STORAGE_SLOT_LIMIT) return false;
  mediaStorageSlots[index] = entry ? normalizeMediaStorageEntry(entry) : null;
  renderMediaStorageSidebar();
  if (options.persist !== false) {
    persistMediaStorageStateNow();
  }
  return true;
};

const readGraphStateFromLiveDom = (block) => {
  const state = normalizeGraphState(readGraphState(block));
  if (!(block instanceof HTMLElement)) return state;

  const chartTitleInput = block.querySelector(".graph-input-chart-title");
  const xTitleInput = block.querySelector(".graph-input-x-title");
  const yTitleInput = block.querySelector(".graph-input-y-title");
  const captionInput = block.querySelector(".graph-input-caption");
  const chartTypeInput = block.querySelector(".graph-input-chart-type");
  const gridToggle = block.querySelector(".graph-input-grid");

  if (chartTitleInput instanceof HTMLInputElement) state.chartTitle = chartTitleInput.value;
  if (xTitleInput instanceof HTMLInputElement) state.xTitle = xTitleInput.value;
  if (yTitleInput instanceof HTMLInputElement) state.yTitle = yTitleInput.value;
  if (captionInput instanceof HTMLInputElement) state.caption = captionInput.value;
  if (chartTypeInput instanceof HTMLSelectElement) state.chartType = normalizeGraphChartType(chartTypeInput.value);
  if (gridToggle instanceof HTMLInputElement) state.grid = gridToggle.checked;

  const xGrid = block.querySelector(".graph-spreadsheet[data-axis='x'] .graph-spreadsheet-grid");
  if (xGrid instanceof HTMLElement) {
    const xInputs = Array.from(xGrid.querySelectorAll(".graph-cell"));
    if (xInputs.length > 0) {
      state.x = xInputs.map((input, index) => {
        if (!(input instanceof HTMLInputElement)) return String(index + 1);
        const typed = String(input.value || "").trim();
        if (typed) return typed;
        const placeholder = String(input.placeholder || "").trim();
        return placeholder || String(index + 1);
      });
    }
  }

  const yGrid = block.querySelector(".graph-spreadsheet[data-axis='y'] .graph-spreadsheet-grid");
  if (yGrid instanceof HTMLElement) {
    const nameInputs = Array.from(yGrid.querySelectorAll(".graph-cell-series-name"));
    if (nameInputs.length > 0) {
      const valueRows = Array.from(yGrid.querySelectorAll(".graph-spreadsheet-row[data-x-index]"));
      state.series = nameInputs.map((nameInput, seriesIndex) => {
        const safeName = nameInput instanceof HTMLInputElement ? String(nameInput.value || "").trim() : "";
        const name = safeName || `Series ${seriesIndex + 1}`;
        const values = valueRows.map((row) => {
          if (!(row instanceof HTMLElement)) return null;
          const cell = row.querySelector(`.graph-cell[data-series-index="${seriesIndex}"]`);
          if (!(cell instanceof HTMLInputElement)) return null;
          const raw = String(cell.value || "").trim();
          if (!raw) return null;
          const numeric = Number(raw);
          return Number.isFinite(numeric) ? numeric : null;
        });
        while (values.length < state.x.length) {
          values.push(null);
        }
        if (values.length > state.x.length) {
          values.length = state.x.length;
        }
        return { name, values };
      });
    }
  }

  return alignGraphSeriesToXAxis(state);
};

const readImageStateFromLiveDom = (block) => {
  const state = normalizeMediaStorageImageState(readImageState(block));
  if (!(block instanceof HTMLElement)) return state;

  const captionInput = block.querySelector(".image-input-caption");
  if (captionInput instanceof HTMLInputElement) {
    state.caption = captionInput.value;
  }
  const widthInput = block.querySelector(".image-input-width");
  if (widthInput instanceof HTMLInputElement) {
    state.width = normalizeImageWidth(widthInput.value, state.wrap);
  }
  return normalizeMediaStorageImageState(state);
};

const slotPayloadFromEditorMediaBlock = (block) => {
  if (!(block instanceof HTMLElement)) return null;
  if (block.classList.contains("graph-block")) {
    return {
      kind: "graph",
      graphState: readGraphStateFromLiveDom(block)
    };
  }
  if (block.classList.contains("image-block")) {
    const imageState = readImageStateFromLiveDom(block);
    if (!imageState.src) return null;
    return {
      kind: "image",
      imageState
    };
  }
  if (block instanceof HTMLTableElement && editor.contains(block) && !block.closest(".graph-block, .image-block")) {
    return {
      kind: "table",
      tableState: readTableStateFromLiveDom(block)
    };
  }
  return null;
};

const applyGraphStorageDataFromSlot = (slotIndex, slotNode) => {
  if (!(slotNode instanceof HTMLElement)) return;
  const slot = mediaStorageSlots[slotIndex];
  if (!slot || slot.kind !== "graph") return;
  const xValuesField = slotNode.querySelector("[data-storage-field='graph-x-values']");
  const seriesField = slotNode.querySelector("[data-storage-field='graph-series-values']");
  const nextState = normalizeGraphState(slot.graphState);

  if (xValuesField instanceof HTMLTextAreaElement) {
    const nextX = parseGraphXTable(xValuesField.value);
    if (nextX.length > 0) {
      nextState.x = nextX;
    }
  }

  if (seriesField instanceof HTMLTextAreaElement) {
    const parsed = parseGraphSeriesTable(seriesField.value, nextState.x.length);
    if (Array.isArray(parsed) && parsed.length > 0) {
      nextState.series = parsed.map((series, index) => {
        const name = String(series && series.name ? series.name : "").trim() || `Series ${index + 1}`;
        const rawValues = Array.isArray(series && series.values) ? series.values : [];
        const values = rawValues.map((value) => {
          const numeric = Number(value);
          return Number.isFinite(numeric) ? numeric : null;
        });
        while (values.length < nextState.x.length) {
          values.push(null);
        }
        if (values.length > nextState.x.length) {
          values.length = nextState.x.length;
        }
        return { name, values };
      });
    }
  }

  slot.graphState = alignGraphSeriesToXAxis(nextState);
  renderMediaStorageSidebar();
  persistMediaStorageStateNow();
};

const applyTableStorageDataFromSlot = (slotIndex, slotNode) => {
  if (!(slotNode instanceof HTMLElement)) return;
  const slot = mediaStorageSlots[slotIndex];
  if (!slot || slot.kind !== "table") return;
  const state = normalizeMediaStorageTableState(slot.tableState);
  const captionField = slotNode.querySelector("[data-storage-field='table-caption']");
  const rowsField = slotNode.querySelector("[data-storage-field='table-rows']");
  const parsed = parseMediaStorageTableText(rowsField instanceof HTMLTextAreaElement ? rowsField.value : "", state);
  slot.tableState = normalizeMediaStorageTableState({
    ...parsed,
    caption: captionField instanceof HTMLInputElement ? String(captionField.value || "").trim() : state.caption
  });
  renderMediaStorageSidebar();
  persistMediaStorageStateNow();
};

const createEditorTableFromStorageState = (tableState) => {
  const normalized = normalizeMediaStorageTableState(tableState);
  const table = document.createElement("table");
  table.className = "editor-table";
  table.dataset.paperTable = "true";
  table.setAttribute("draggable", "true");

  const caption = document.createElement("caption");
  caption.className = "editor-table-caption";
  caption.textContent = normalized.caption || "Table caption";
  table.append(caption);

  const tbody = document.createElement("tbody");
  normalized.rows.forEach((rowData, rowIndex) => {
    const row = document.createElement("tr");
    rowData.forEach((value) => {
      const cell = document.createElement(rowIndex === 0 ? "th" : "td");
      const text = String(value || "").trim();
      if (text) {
        cell.textContent = text;
      } else {
        cell.innerHTML = "<br>";
      }
      row.append(cell);
    });
    tbody.append(row);
  });
  table.append(tbody);
  return table;
};

const insertStoredTableAtCaret = (tableState) => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const table = createEditorTableFromStorageState(tableState);
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";
  const fragment = document.createDocumentFragment();
  fragment.append(table, paragraph);

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  syncTableNumbers();
  const firstCell = table.querySelector("tbody th, tbody td");
  if (firstCell) {
    const nextRange = document.createRange();
    nextRange.selectNodeContents(firstCell);
    nextRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(nextRange);
  }
  table.scrollIntoView({ block: "center", inline: "nearest" });
  openTableSidebarForTable(table, { tab: "structure" });
  markDocumentChanged();
  return table;
};

const insertStoredMediaFromSlot = (slotIndex) => {
  if (!Number.isFinite(slotIndex)) return false;
  const index = Math.floor(slotIndex);
  if (index < 0 || index >= MEDIA_STORAGE_SLOT_LIMIT) return false;
  const slot = mediaStorageSlots[index];
  if (!slot) return false;

  if (!restoreSelectionRange(mediaStorageInsertRange)) {
    ensureSelectionOnSurface();
  }

  if (slot.kind === "graph") {
    insertGraphBlockAtCaret(slot.graphState);
  } else if (slot.kind === "image") {
    insertImageBlockAtCaret(slot.imageState);
  } else if (slot.kind === "table") {
    insertStoredTableAtCaret(slot.tableState);
  } else {
    return false;
  }

  mediaStorageInsertRange = captureCurrentSelectionRange(editor);
  return true;
};

const closeMediaStorageSidebar = () => {
  mediaStorageSidebarOpen = false;
  clearMediaStorageDropTargets();
  if (!mediaStorageSidebar) return;
  mediaStorageSidebar.classList.remove("is-open");
  mediaStorageSidebar.setAttribute("aria-hidden", "true");
};

const openMediaStorageSidebar = () => {
  if (!mediaStorageSidebar || !mediaStorageList) return;
  closeAllPanels();
  mediaStorageInsertRange = captureCurrentSelectionRange(editor);
  mediaStorageSidebarOpen = true;
  mediaStorageSidebar.classList.add("is-open");
  mediaStorageSidebar.setAttribute("aria-hidden", "false");
  renderMediaStorageSidebar();
};

const toggleMediaStorageSidebar = () => {
  if (mediaStorageSidebarOpen) {
    closeMediaStorageSidebar();
    ensureSelectionOnSurface();
  } else {
    openMediaStorageSidebar();
  }
};

if (mediaStorageList) {
  mediaStorageList.addEventListener("click", (event) => {
    const target = event.target;
    if (!(target instanceof Element)) return;
    const slotNode = target.closest(".media-storage-slot");
    if (!(slotNode instanceof HTMLElement)) return;
    const slotIndex = mediaStorageSlotIndexFromNode(slotNode);
    if (slotIndex < 0) return;

    const actionButton = target.closest("[data-storage-action]");
    if (!(actionButton instanceof HTMLElement)) return;
    const action = String(actionButton.dataset.storageAction || "");

    if (action === "insert") {
      event.preventDefault();
      insertStoredMediaFromSlot(slotIndex);
      return;
    }
    if (action === "clear") {
      event.preventDefault();
      setMediaStorageSlot(slotIndex, null);
      return;
    }
    if (action === "apply-graph-data") {
      event.preventDefault();
      applyGraphStorageDataFromSlot(slotIndex, slotNode);
      return;
    }
    if (action === "apply-table-data") {
      event.preventDefault();
      applyTableStorageDataFromSlot(slotIndex, slotNode);
      return;
    }
    if (action === "replace-image") {
      event.preventDefault();
      const slot = mediaStorageSlots[slotIndex];
      if (!slot || slot.kind !== "image") return;
      const picker = document.createElement("input");
      picker.type = "file";
      picker.accept = "image/*";
      picker.style.display = "none";
      document.body.append(picker);
      picker.addEventListener(
        "change",
        async () => {
          const file = picker.files && picker.files[0];
          picker.remove();
          if (!file || !isImageFile(file)) return;
          try {
            const src = await readImageFileAsDataUrl(file);
            if (!src) return;
            slot.imageState = normalizeMediaStorageImageState({
              ...slot.imageState,
              src,
              alt: file.name || slot.imageState.alt,
              caption: slot.imageState.caption || fileCaptionFromName(file.name)
            });
            renderMediaStorageSidebar();
            persistMediaStorageStateNow();
          } catch {
            // Ignore replacement failures.
          }
        },
        { once: true }
      );
      picker.click();
    }
  });

  mediaStorageList.addEventListener("input", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const slotNode = target.closest(".media-storage-slot");
    if (!(slotNode instanceof HTMLElement)) return;
    const slotIndex = mediaStorageSlotIndexFromNode(slotNode);
    if (slotIndex < 0) return;
    const slot = mediaStorageSlots[slotIndex];
    if (!slot) return;
    const field = String(target.dataset.storageField || "");
    if (!field) return;

    if (slot.kind === "graph") {
      const state = normalizeGraphState(slot.graphState);
      if (field === "graph-chart-title" && target instanceof HTMLInputElement) {
        state.chartTitle = target.value;
      } else if (field === "graph-caption" && target instanceof HTMLInputElement) {
        state.caption = target.value;
      } else if (field === "graph-x-title" && target instanceof HTMLInputElement) {
        state.xTitle = target.value;
      } else if (field === "graph-y-title" && target instanceof HTMLInputElement) {
        state.yTitle = target.value;
      } else if (field === "graph-chart-type" && target instanceof HTMLSelectElement) {
        state.chartType = normalizeGraphChartType(target.value);
      } else if (field === "graph-grid" && target instanceof HTMLInputElement) {
        state.grid = target.checked;
        const svg = slotNode.querySelector(".media-storage-graph-svg");
        renderMediaStorageGraphPreview(svg, state);
      } else {
        return;
      }
      slot.graphState = state;
      const svg = slotNode.querySelector(".media-storage-graph-svg");
      renderMediaStorageGraphPreview(svg, state);
      scheduleMediaStoragePersist();
      return;
    }

    if (slot.kind === "table") {
      if (field !== "table-caption" || !(target instanceof HTMLInputElement)) return;
      const state = normalizeMediaStorageTableState(slot.tableState);
      state.caption = String(target.value || "").trim() || "Table caption";
      slot.tableState = state;
      scheduleMediaStoragePersist();
      return;
    }

    if (slot.kind !== "image") return;
    const imageState = normalizeMediaStorageImageState(slot.imageState);
    if (field === "image-caption" && target instanceof HTMLInputElement) {
      imageState.caption = target.value;
    } else if (field === "image-alt" && target instanceof HTMLInputElement) {
      imageState.alt = target.value;
      const preview = slotNode.querySelector(".media-storage-image-preview");
      if (preview instanceof HTMLImageElement) {
        preview.alt = imageState.alt;
      }
    } else if (field === "image-width" && target instanceof HTMLInputElement) {
      imageState.width = normalizeImageWidth(target.value, imageState.wrap);
      target.value = String(imageState.width);
      const valueNode = slotNode.querySelector(".media-storage-range-value");
      if (valueNode) {
        valueNode.textContent = `${imageState.width}%`;
      }
    } else {
      return;
    }
    slot.imageState = imageState;
    scheduleMediaStoragePersist();
  });

  mediaStorageList.addEventListener("change", (event) => {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const slotNode = target.closest(".media-storage-slot");
    if (!(slotNode instanceof HTMLElement)) return;
    const slotIndex = mediaStorageSlotIndexFromNode(slotNode);
    if (slotIndex < 0) return;
    const slot = mediaStorageSlots[slotIndex];
    const field = String(target.dataset.storageField || "");
    if (!slot) return;

    if (slot.kind === "graph") {
      if (field !== "graph-chart-type" || !(target instanceof HTMLSelectElement)) return;
      const state = normalizeGraphState(slot.graphState);
      state.chartType = normalizeGraphChartType(target.value);
      slot.graphState = state;
      const svg = slotNode.querySelector(".media-storage-graph-svg");
      renderMediaStorageGraphPreview(svg, state);
      scheduleMediaStoragePersist();
      return;
    }

    if (slot.kind !== "image") return;
    const imageState = normalizeMediaStorageImageState(slot.imageState);

    if (field === "image-align" && target instanceof HTMLSelectElement) {
      imageState.align = normalizeImageAlign(target.value);
    } else if (field === "image-wrap" && target instanceof HTMLSelectElement) {
      imageState.wrap = normalizeImageWrap(target.value);
      imageState.width = normalizeImageWidth(imageState.width, imageState.wrap);
      renderMediaStorageSidebar();
    } else if (field === "image-width" && target instanceof HTMLInputElement) {
      imageState.width = normalizeImageWidth(target.value, imageState.wrap);
      target.value = String(imageState.width);
      const valueNode = slotNode.querySelector(".media-storage-range-value");
      if (valueNode) {
        valueNode.textContent = `${imageState.width}%`;
      }
    } else {
      return;
    }

    slot.imageState = imageState;
    persistMediaStorageStateNow();
  });

  mediaStorageList.addEventListener("dragover", (event) => {
    const fromDraggedNode =
      draggedMediaBlock instanceof HTMLElement &&
      (draggedMediaBlock.classList.contains("graph-block") ||
        draggedMediaBlock.classList.contains("image-block") ||
        draggedMediaBlock instanceof HTMLTableElement);
    const transferTypes = event.dataTransfer ? Array.from(event.dataTransfer.types || []) : [];
    const fromTransferPayload =
      transferTypes.includes("application/x-paper-media") ||
      transferTypes.includes("text/x-paper-media");
    if (!fromDraggedNode && !fromTransferPayload) return;
    const slotIndex = resolveMediaStorageDropSlotIndex(event.target, event.clientY);
    if (slotIndex < 0) return;
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = "copy";
    }
    clearMediaStorageDropTargets();
    const slotNode = mediaStorageList.querySelector(`.media-storage-slot[data-slot-index="${slotIndex}"]`);
    if (slotNode instanceof HTMLElement) {
      slotNode.classList.add("is-drop-target");
    }
  });

  mediaStorageList.addEventListener("dragleave", (event) => {
    const slotNode = event.target instanceof Element ? event.target.closest(".media-storage-slot") : null;
    if (!(slotNode instanceof HTMLElement)) return;
    const related = event.relatedTarget;
    if (related instanceof Node && slotNode.contains(related)) return;
    slotNode.classList.remove("is-drop-target");
  });

  mediaStorageList.addEventListener("drop", (event) => {
    const slotIndex = resolveMediaStorageDropSlotIndex(event.target, event.clientY);
    if (slotIndex < 0) return;
    event.preventDefault();
    event.stopPropagation();
    clearMediaStorageDropTargets();
    let payload = slotPayloadFromEditorMediaBlock(draggedMediaBlock);
    if (!payload && event.dataTransfer) {
      const rawPayload =
        event.dataTransfer.getData("application/x-paper-media") ||
        event.dataTransfer.getData("text/x-paper-media");
      if (rawPayload) {
        try {
          payload = normalizeMediaStorageEntry(JSON.parse(rawPayload));
        } catch {
          payload = null;
        }
      }
    }
    if (!payload) {
      payload = slotPayloadFromEditorMediaBlock(activeGraphBlock || activeImageBlock || activeTableElement);
    }
    if (!payload) return;
    setMediaStorageSlot(slotIndex, payload);
    clearMediaDragState();
  });
}

const createPageBreakBlock = () => {
  const block = document.createElement("div");
  block.className = "page-break-block";
  block.setAttribute("contenteditable", "false");
  block.setAttribute("tabindex", "0");

  const label = document.createElement("span");
  label.className = "page-break-label";
  label.textContent = "Page Break";
  block.append(label);

  return block;
};

const insertPageBreakAtCaret = () => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const pageBreak = createPageBreakBlock();
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";

  const fragment = document.createDocumentFragment();
  fragment.append(pageBreak, paragraph);

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  const nextRange = document.createRange();
  nextRange.setStart(paragraph, 0);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);

  pageBreak.scrollIntoView({ block: "center", inline: "nearest" });
  markDocumentChanged();
};

const buildDefaultEditorTable = (rows = 3, cols = 3) => {
  const safeRows = Math.max(2, Math.min(12, Number.isFinite(Number(rows)) ? Math.round(Number(rows)) : 3));
  const safeCols = Math.max(2, Math.min(10, Number.isFinite(Number(cols)) ? Math.round(Number(cols)) : 3));

  const table = document.createElement("table");
  table.className = "editor-table";
  table.dataset.paperTable = "true";
  table.setAttribute("draggable", "true");

  const caption = document.createElement("caption");
  caption.className = "editor-table-caption";
  caption.textContent = "Table caption";
  table.append(caption);

  const tbody = document.createElement("tbody");
  for (let rowIndex = 0; rowIndex < safeRows; rowIndex += 1) {
    const row = document.createElement("tr");
    for (let colIndex = 0; colIndex < safeCols; colIndex += 1) {
      const cell = document.createElement(rowIndex === 0 ? "th" : "td");
      if (rowIndex === 0) {
        cell.textContent = `Header ${colIndex + 1}`;
      } else {
        cell.innerHTML = "<br>";
      }
      row.append(cell);
    }
    tbody.append(row);
  }
  table.append(tbody);
  return table;
};

const normalizeTableCaptionSuffix = (value) => {
  const cleaned = String(value || "").replace(/\s+/g, " ").trim();
  if (!cleaned) return "Table caption";
  const withoutPrefix = cleaned.replace(/^Table\s+\d+\.?\s*/i, "").trim();
  return withoutPrefix || "Table caption";
};

const normalizeEditorTableRows = (table) => {
  if (!(table instanceof HTMLTableElement)) return;
  const rows = tableRows(table);
  if (rows.length === 0) return;
  const hasSpans = rows.some((row) =>
    Array.from(row.cells).some((cell) => cell.colSpan > 1 || cell.rowSpan > 1)
  );
  if (hasSpans) return;

  const header = rows[0];
  if (!(header instanceof HTMLTableRowElement)) return;
  if (header.cells.length === 0) {
    const placeholder = document.createElement("th");
    placeholder.textContent = "Header 1";
    header.append(placeholder);
  }
  const targetColumns = Math.max(1, header.cells.length);

  for (let rowIndex = 1; rowIndex < rows.length; rowIndex += 1) {
    const row = rows[rowIndex];
    while (row.cells.length > targetColumns) {
      row.deleteCell(row.cells.length - 1);
    }
    while (row.cells.length < targetColumns) {
      const cell = document.createElement("td");
      cell.innerHTML = "<br>";
      row.append(cell);
    }
  }
};

const syncTableNumbers = () => {
  const tables = Array.from(editor.querySelectorAll("table")).filter(
    (table) => table instanceof HTMLTableElement && !table.closest(".graph-block, .image-block")
  );
  tables.forEach((table, index) => {
    if (!(table instanceof HTMLTableElement)) return;
    table.dataset.paperTable = "true";
    table.classList.add("editor-table");
    table.setAttribute("draggable", "true");
    normalizeEditorTableRows(table);
    let caption = table.querySelector("caption");
    if (!(caption instanceof HTMLElement)) {
      caption = document.createElement("caption");
      table.insertBefore(caption, table.firstChild);
    }
    caption.classList.add("editor-table-caption");
    const suffix = normalizeTableCaptionSuffix(caption.textContent || "");
    caption.textContent = `Table ${index + 1}. ${suffix}`;
  });
  if (citationSidebarOpen) {
    renderCitationList();
  }
  if (activeTableElement instanceof HTMLTableElement) {
    if (!editor.contains(activeTableElement)) {
      closeTableSidebar();
    } else {
      activeTableElement.classList.add("is-table-active");
      syncTableSidebarControls();
    }
  }
};

const normalizeTableAnalysisPrecision = (value) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 2;
  return Math.max(0, Math.min(6, Math.round(numeric)));
};

const readTableAnalysisPrecision = () => {
  if (!(tableAnalysisPrecisionInput instanceof HTMLInputElement)) return 2;
  const precision = normalizeTableAnalysisPrecision(tableAnalysisPrecisionInput.value);
  tableAnalysisPrecisionInput.value = String(precision);
  return precision;
};

const TABLE_NUMBER_PATTERN = /[-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?/;

const parseNumericFromTableCellText = (value) => {
  const text = String(value || "").replace(/\u00a0/g, " ").trim();
  if (!text) return null;
  const match = text.match(TABLE_NUMBER_PATTERN);
  if (!match) return null;
  const numeric = Number(match[0]);
  return Number.isFinite(numeric) ? numeric : null;
};

const formatTableNumber = (value, precision = 2) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return "";
  const fixed = numeric.toFixed(Math.max(0, Math.min(6, precision)));
  return fixed.replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1");
};

const tableRows = (table) => {
  if (!(table instanceof HTMLTableElement)) return [];
  return Array.from(table.rows).filter((row) => row instanceof HTMLTableRowElement);
};

const tableHeaderRow = (table) => {
  const rows = tableRows(table);
  return rows.length > 0 ? rows[0] : null;
};

const tablePrimaryColumnIndexes = (table) => {
  const header = tableHeaderRow(table);
  if (!(header instanceof HTMLTableRowElement)) return [];
  return Array.from(header.cells)
    .map((_, index) => index)
    .filter((index) => {
      const cell = header.cells[index];
      return !(cell instanceof HTMLElement) || !cell.dataset.tableStatCol;
    });
};

const tableBodyDataRows = (table) => {
  const rows = tableRows(table);
  if (rows.length <= 1) return [];
  return rows.slice(1).filter((row) => !(row instanceof HTMLElement) || !row.dataset.tableStatRow);
};

const ensureTableCaption = (table) => {
  if (!(table instanceof HTMLTableElement)) return null;
  let caption = table.querySelector("caption");
  if (!(caption instanceof HTMLElement)) {
    caption = document.createElement("caption");
    table.insertBefore(caption, table.firstChild);
  }
  caption.classList.add("editor-table-caption");
  if (!String(caption.textContent || "").trim()) {
    caption.textContent = "Table caption";
  }
  return caption;
};

const tableMean = (values) => {
  if (!Array.isArray(values) || values.length === 0) return null;
  const total = values.reduce((sum, value) => sum + value, 0);
  return total / values.length;
};

const tableSampleStdDev = (values) => {
  if (!Array.isArray(values) || values.length <= 1) return 0;
  const mean = tableMean(values);
  if (!Number.isFinite(mean)) return 0;
  const variance =
    values.reduce((sum, value) => {
      const diff = value - mean;
      return sum + diff * diff;
    }, 0) /
    (values.length - 1);
  return Math.sqrt(Math.max(0, variance));
};

const removeTableStatRows = (table, kind = "") => {
  tableRows(table).forEach((row) => {
    if (!(row instanceof HTMLElement)) return;
    const rowKind = String(row.dataset.tableStatRow || "");
    if (!rowKind) return;
    if (kind && rowKind !== kind) return;
    row.remove();
  });
};

const removeTableStatColumns = (table, kind = "") => {
  const header = tableHeaderRow(table);
  if (!(header instanceof HTMLTableRowElement)) return;
  const columnIndexes = Array.from(header.cells)
    .map((cell, index) => ({ cell, index }))
    .filter(({ cell }) => {
      if (!(cell instanceof HTMLElement)) return false;
      const cellKind = String(cell.dataset.tableStatCol || "");
      if (!cellKind) return false;
      return !kind || cellKind === kind;
    })
    .map(({ index }) => index)
    .sort((a, b) => b - a);
  if (columnIndexes.length === 0) return;

  tableRows(table).forEach((row) => {
    columnIndexes.forEach((index) => {
      if (index >= 0 && index < row.cells.length) {
        row.deleteCell(index);
      }
    });
  });
};

const clearTableUncertaintyCells = (table) => {
  const rows = tableBodyDataRows(table);
  const primaryIndexes = tablePrimaryColumnIndexes(table);
  const precision = readTableAnalysisPrecision();
  let changed = false;
  rows.forEach((row) => {
    primaryIndexes.forEach((columnIndex) => {
      const cell = row.cells[columnIndex];
      if (!(cell instanceof HTMLElement)) return;
      const currentText = String(cell.textContent || "");
      if (!cell.dataset.tableUncertainty && !currentText.includes("+/-") && !currentText.includes("±")) return;
      const numeric = parseNumericFromTableCellText(cell.textContent || "");
      if (Number.isFinite(numeric)) {
        cell.textContent = formatTableNumber(numeric, precision);
      }
      delete cell.dataset.tableUncertainty;
      changed = true;
    });
  });
  return changed;
};

const clearTableAnalysisArtifacts = (table) => {
  if (!(table instanceof HTMLTableElement)) return;
  removeTableStatRows(table);
  removeTableStatColumns(table);
  clearTableUncertaintyCells(table);
};

const upsertTableStatRow = (table, kind, label, byColumnIndex, precision) => {
  if (!(table instanceof HTMLTableElement)) return false;
  const header = tableHeaderRow(table);
  if (!(header instanceof HTMLTableRowElement)) return false;
  const columnCount = Math.max(1, header.cells.length);
  removeTableStatRows(table, kind);

  const row = document.createElement("tr");
  row.dataset.tableStatRow = kind;
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const cell = document.createElement(columnIndex === 0 ? "th" : "td");
    if (columnIndex === 0) {
      cell.textContent = label;
    } else {
      const value = byColumnIndex[columnIndex];
      cell.textContent = Number.isFinite(value) ? formatTableNumber(value, precision) : "";
    }
    row.append(cell);
  }

  const tbody = table.tBodies[0];
  if (tbody instanceof HTMLTableSectionElement) {
    tbody.append(row);
  } else {
    table.append(row);
  }
  return true;
};

const upsertTableStatColumn = (table, kind, label, byRowElement, precision) => {
  if (!(table instanceof HTMLTableElement)) return false;
  const rows = tableRows(table);
  if (rows.length === 0) return false;
  removeTableStatColumns(table, kind);

  rows.forEach((row, rowIndex) => {
    const cell = document.createElement(rowIndex === 0 ? "th" : "td");
    cell.dataset.tableStatCol = kind;
    if (rowIndex === 0) {
      cell.textContent = label;
    } else if (row instanceof HTMLElement && !row.dataset.tableStatRow) {
      const value = byRowElement.get(row);
      cell.textContent = Number.isFinite(value) ? formatTableNumber(value, precision) : "";
    } else {
      cell.textContent = "";
    }
    row.append(cell);
  });
  return true;
};

const addColumnMeansToTable = (table) => {
  const bodyRows = tableBodyDataRows(table);
  const primaryColumns = tablePrimaryColumnIndexes(table);
  if (bodyRows.length === 0 || primaryColumns.length === 0) return false;
  const header = tableHeaderRow(table);
  if (!(header instanceof HTMLTableRowElement)) return false;

  const byColumnIndex = Array.from({ length: header.cells.length }, () => null);
  primaryColumns.forEach((columnIndex) => {
    const values = bodyRows
      .map((row) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
      .filter((value) => Number.isFinite(value));
    byColumnIndex[columnIndex] = values.length > 0 ? tableMean(values) : null;
  });
  return upsertTableStatRow(table, "col-mean", "Mean", byColumnIndex, readTableAnalysisPrecision());
};

const addColumnStdDevToTable = (table) => {
  const bodyRows = tableBodyDataRows(table);
  const primaryColumns = tablePrimaryColumnIndexes(table);
  if (bodyRows.length === 0 || primaryColumns.length === 0) return false;
  const header = tableHeaderRow(table);
  if (!(header instanceof HTMLTableRowElement)) return false;

  const byColumnIndex = Array.from({ length: header.cells.length }, () => null);
  primaryColumns.forEach((columnIndex) => {
    const values = bodyRows
      .map((row) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
      .filter((value) => Number.isFinite(value));
    byColumnIndex[columnIndex] = values.length > 0 ? tableSampleStdDev(values) : null;
  });
  return upsertTableStatRow(table, "col-std", "Std Dev", byColumnIndex, readTableAnalysisPrecision());
};

const addRowMeansToTable = (table) => {
  const bodyRows = tableBodyDataRows(table);
  const primaryColumns = tablePrimaryColumnIndexes(table);
  if (bodyRows.length === 0 || primaryColumns.length === 0) return false;
  const byRowElement = new Map();

  bodyRows.forEach((row) => {
    const values = primaryColumns
      .map((columnIndex) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
      .filter((value) => Number.isFinite(value));
    byRowElement.set(row, values.length > 0 ? tableMean(values) : null);
  });
  return upsertTableStatColumn(table, "row-mean", "Mean", byRowElement, readTableAnalysisPrecision());
};

const addRowStdDevToTable = (table) => {
  const bodyRows = tableBodyDataRows(table);
  const primaryColumns = tablePrimaryColumnIndexes(table);
  if (bodyRows.length === 0 || primaryColumns.length === 0) return false;
  const byRowElement = new Map();

  bodyRows.forEach((row) => {
    const values = primaryColumns
      .map((columnIndex) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
      .filter((value) => Number.isFinite(value));
    byRowElement.set(row, values.length > 0 ? tableSampleStdDev(values) : null);
  });
  return upsertTableStatColumn(table, "row-std", "Std Dev", byRowElement, readTableAnalysisPrecision());
};

const applyUncertaintyToTableCells = (table, source = "column") => {
  const bodyRows = tableBodyDataRows(table);
  const primaryColumns = tablePrimaryColumnIndexes(table);
  if (bodyRows.length === 0 || primaryColumns.length === 0) return false;
  const precision = readTableAnalysisPrecision();
  const mode = source === "row" ? "row" : "column";

  const sigmaByColumn = new Map();
  const sigmaByRow = new Map();

  if (mode === "column") {
    primaryColumns.forEach((columnIndex) => {
      const values = bodyRows
        .map((row) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
        .filter((value) => Number.isFinite(value));
      sigmaByColumn.set(columnIndex, values.length > 0 ? tableSampleStdDev(values) : null);
    });
  } else {
    bodyRows.forEach((row) => {
      const values = primaryColumns
        .map((columnIndex) => parseNumericFromTableCellText(row.cells[columnIndex]?.textContent || ""))
        .filter((value) => Number.isFinite(value));
      sigmaByRow.set(row, values.length > 0 ? tableSampleStdDev(values) : null);
    });
  }

  let changed = false;
  bodyRows.forEach((row) => {
    primaryColumns.forEach((columnIndex) => {
      const cell = row.cells[columnIndex];
      if (!(cell instanceof HTMLElement)) return;
      const value = parseNumericFromTableCellText(cell.textContent || "");
      if (!Number.isFinite(value)) return;

      const sigma = mode === "column" ? sigmaByColumn.get(columnIndex) : sigmaByRow.get(row);
      if (!Number.isFinite(sigma)) return;

      cell.textContent = `${formatTableNumber(value, precision)} +/- ${formatTableNumber(sigma, precision)}`;
      cell.dataset.tableUncertainty = "true";
      changed = true;
    });
  });
  return changed;
};

const appendTableRow = (table) => {
  if (!(table instanceof HTMLTableElement)) return false;
  clearTableAnalysisArtifacts(table);
  const rows = tableRows(table);
  if (rows.length === 0) return false;
  const header = rows[0];
  const columnCount = Math.max(1, header.cells.length);

  const row = document.createElement("tr");
  for (let columnIndex = 0; columnIndex < columnCount; columnIndex += 1) {
    const cell = document.createElement("td");
    cell.innerHTML = "<br>";
    row.append(cell);
  }

  const tbody = table.tBodies[0];
  if (tbody instanceof HTMLTableSectionElement) {
    tbody.append(row);
  } else {
    table.append(row);
  }
  return true;
};

const removeTableRow = (table) => {
  if (!(table instanceof HTMLTableElement)) return false;
  clearTableAnalysisArtifacts(table);
  const dataRows = tableBodyDataRows(table);
  if (dataRows.length <= 1) return false;
  dataRows[dataRows.length - 1].remove();
  return true;
};

const appendTableColumn = (table) => {
  if (!(table instanceof HTMLTableElement)) return false;
  clearTableAnalysisArtifacts(table);
  const rows = tableRows(table);
  if (rows.length === 0) return false;

  const header = rows[0];
  const nextIndex = header.cells.length + 1;
  rows.forEach((row, rowIndex) => {
    const isHeaderRow = rowIndex === 0;
    const cell = document.createElement(isHeaderRow ? "th" : "td");
    if (isHeaderRow) {
      cell.textContent = `Header ${nextIndex}`;
    } else {
      cell.innerHTML = "<br>";
    }
    row.append(cell);
  });
  return true;
};

const removeTableColumn = (table) => {
  if (!(table instanceof HTMLTableElement)) return false;
  clearTableAnalysisArtifacts(table);
  const rows = tableRows(table);
  if (rows.length === 0) return false;
  const header = rows[0];
  if (header.cells.length <= 2) return false;
  const targetIndex = header.cells.length - 1;
  rows.forEach((row) => {
    if (targetIndex >= 0 && targetIndex < row.cells.length) {
      row.deleteCell(targetIndex);
    }
  });
  return true;
};

const tableElementForNode = (node) => {
  const element = isElementNode(node) ? node : node && node.parentElement;
  if (!(element instanceof Element)) return null;
  const table = element.closest("table");
  if (!(table instanceof HTMLTableElement) || !editor.contains(table)) return null;
  table.dataset.paperTable = "true";
  table.classList.add("editor-table");
  table.setAttribute("draggable", "true");
  return table;
};

const setTableSidebarTab = (nextTab) => {
  const tab = nextTab === "analyze" ? "analyze" : "structure";
  tableSidebarTab = tab;
  const showStructure = tab === "structure";

  if (tableTabStructureButton) {
    tableTabStructureButton.classList.toggle("is-selected", showStructure);
    tableTabStructureButton.setAttribute("aria-selected", showStructure ? "true" : "false");
  }
  if (tableTabAnalyzeButton) {
    tableTabAnalyzeButton.classList.toggle("is-selected", !showStructure);
    tableTabAnalyzeButton.setAttribute("aria-selected", showStructure ? "false" : "true");
  }
  if (tablePanelStructure) {
    tablePanelStructure.classList.toggle("is-open", showStructure);
  }
  if (tablePanelAnalyze) {
    tablePanelAnalyze.classList.toggle("is-open", !showStructure);
  }
};

const syncTableSidebarControls = () => {
  if (!(activeTableElement instanceof HTMLTableElement)) return;
  const caption = ensureTableCaption(activeTableElement);
  if (caption instanceof HTMLElement && tableCaptionInput instanceof HTMLInputElement && document.activeElement !== tableCaptionInput) {
    tableCaptionInput.value = normalizeTableCaptionSuffix(caption.textContent || "");
  }
  if (tableAnalysisPrecisionInput instanceof HTMLInputElement) {
    const precision = normalizeTableAnalysisPrecision(tableAnalysisPrecisionInput.value);
    tableAnalysisPrecisionInput.value = String(precision);
  }
};

const closeTableSidebar = () => {
  tableSidebarOpen = false;
  if (activeTableElement instanceof HTMLTableElement) {
    activeTableElement.classList.remove("is-table-active");
  }
  activeTableElement = null;
  if (tableSidebar instanceof HTMLElement) {
    tableSidebar.classList.remove("is-open");
    tableSidebar.setAttribute("aria-hidden", "true");
  }
};

const openTableSidebarForTable = (table, options = {}) => {
  if (!(table instanceof HTMLTableElement) || !editor.contains(table)) return false;
  table.dataset.paperTable = "true";
  table.classList.add("editor-table");
  table.setAttribute("draggable", "true");

  if (activeTableElement instanceof HTMLTableElement && activeTableElement !== table) {
    activeTableElement.classList.remove("is-table-active");
  }
  activeTableElement = table;
  activeTableElement.classList.add("is-table-active");
  tableSidebarOpen = true;
  if (tableSidebar instanceof HTMLElement) {
    tableSidebar.classList.add("is-open");
    tableSidebar.setAttribute("aria-hidden", "false");
  }
  if (options && options.tab) {
    setTableSidebarTab(options.tab);
  } else {
    setTableSidebarTab(tableSidebarTab);
  }
  syncTableSidebarControls();
  return true;
};

const syncTableSidebarFromSelection = () => {
  if (tableSidebar instanceof HTMLElement && tableSidebar.contains(document.activeElement)) return;
  const selection = window.getSelection();
  const anchor = selection && selection.rangeCount > 0 ? selection.anchorNode : null;
  const table = tableElementForNode(anchor);
  if (table) {
    openTableSidebarForTable(table);
    return;
  }
  if (tableSidebarOpen) {
    closeTableSidebar();
  }
};

const insertTableAtCaret = (rows = 3, cols = 3) => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  const table = buildDefaultEditorTable(rows, cols);
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";
  const fragment = document.createDocumentFragment();
  fragment.append(table, paragraph);

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  syncTableNumbers();
  const firstCell = table.querySelector("tbody th, tbody td");
  if (firstCell) {
    const nextRange = document.createRange();
    nextRange.selectNodeContents(firstCell);
    nextRange.collapse(true);
    selection.removeAllRanges();
    selection.addRange(nextRange);
  }

  table.scrollIntoView({ block: "center", inline: "nearest" });
  openTableSidebarForTable(table, { tab: "structure" });
  markDocumentChanged();
  return table;
};

const insertSectionAtCaret = (levelOrHeading = 2, headingText = "") => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return;

  let level = 2;
  let text = headingText;
  if (typeof levelOrHeading === "string") {
    text = levelOrHeading;
  } else if (typeof levelOrHeading === "number") {
    level = Math.max(2, Math.min(4, Math.round(levelOrHeading)));
  }

  if (!text) {
    if (level === 3) {
      text = "New Subsection";
    } else if (level === 4) {
      text = "New Subsubsection";
    } else {
      text = "New Section";
    }
  }

  const heading = document.createElement(`h${level}`);
  heading.textContent = text;
  const paragraph = document.createElement("p");
  paragraph.innerHTML = "<br>";

  const fragment = document.createDocumentFragment();
  fragment.append(heading, paragraph);

  const range = selection.getRangeAt(0);
  range.deleteContents();
  const insertionRange = resolveTopLevelBlockInsertionRange(range);
  insertionRange.insertNode(fragment);
  normalizeEditorTopLevelBlockStructure();

  const nextRange = document.createRange();
  nextRange.selectNodeContents(heading);
  nextRange.collapse(false);
  selection.removeAllRanges();
  selection.addRange(nextRange);

  heading.scrollIntoView({ block: "center", inline: "nearest" });
  markDocumentChanged();
  if (sectionFinderOpen) {
    sectionEntries = collectSectionEntries();
    sectionIndex = detectActiveSectionIndex(sectionEntries);
    renderSectionFinder();
  }
};

const insertMathAtCaret = () => {
  ensureSelectionInEditor();
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return false;

  const range = selection.getRangeAt(0);
  range.deleteContents();

  const source = `${LATEX_OPEN_DELIMITER}${LATEX_CLOSE_DELIMITER}`;
  const textNode = document.createTextNode(source);
  range.insertNode(textNode);

  const nextRange = document.createRange();
  nextRange.setStart(textNode, LATEX_OPEN_DELIMITER.length);
  nextRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(nextRange);

  markDocumentChanged();
  return true;
};

const executeInlineCommand = (commandId) => {
  if (commandId === "cite") {
    openCitationSidebar(true);
    return;
  }
  if (commandId === "section") {
    insertSectionAtCaret(2);
    return;
  }
  if (commandId === "subtitle") {
    executeEditorCommand("subtitle");
    return;
  }
  if (commandId === "subsection") {
    insertSectionAtCaret(3);
    return;
  }
  if (commandId === "subsubsection") {
    insertSectionAtCaret(4);
    return;
  }
  if (commandId === "bullets") {
    executeEditorCommand("insertUnorderedList");
    return;
  }
  if (commandId === "numbered") {
    executeEditorCommand("insertOrderedList");
    return;
  }
  if (commandId === "table") {
    insertTableAtCaret();
    return;
  }
  if (commandId === "pagebreak") {
    insertPageBreakAtCaret();
    return;
  }
  if (commandId === "math") {
    insertMathAtCaret();
    return;
  }
  if (commandId === "graph") {
    insertGraphBlockAtCaret();
    return;
  }
  if (commandId === "image") {
    void promptInsertImageFromPicker();
  }
};

const consumeInlineCommandAtCaret = (container) => {
  const commands = [...INLINE_COMMANDS].sort((left, right) => right.trigger.length - left.trigger.length);
  for (const command of commands) {
    const variants = commandTriggerVariants(command);
    for (const variant of variants) {
      if (consumeInlineTrigger(container, variant)) {
        executeInlineCommand(command.id);
        closeInlineCommandMenu();
        return true;
      }
    }
  }
  return false;
};

const isEscapedAt = (source, index) => {
  let slashCount = 0;
  for (let cursor = index - 1; cursor >= 0 && source[cursor] === "\\"; cursor -= 1) {
    slashCount += 1;
  }
  return slashCount % 2 === 1;
};

const LATEX_OPEN_DELIMITER = "\\[";
const LATEX_CLOSE_DELIMITER = "\\]";

const findNextUnescapedDelimiter = (source, delimiter, fromIndex) => {
  let cursor = Math.max(0, fromIndex);
  while (cursor < source.length) {
    const matchIndex = source.indexOf(delimiter, cursor);
    if (matchIndex < 0) {
      return -1;
    }
    if (!isEscapedAt(source, matchIndex)) {
      return matchIndex;
    }
    cursor = matchIndex + delimiter.length;
  }
  return -1;
};

const splitLatexSegments = (source) => {
  const segments = [];
  let cursor = 0;

  while (cursor < source.length) {
    const open = findNextUnescapedDelimiter(source, LATEX_OPEN_DELIMITER, cursor);
    if (open < 0) {
      segments.push({ type: "text", value: source.slice(cursor) });
      break;
    }

    if (open > cursor) {
      segments.push({ type: "text", value: source.slice(cursor, open) });
    }

    const close = findNextUnescapedDelimiter(source, LATEX_CLOSE_DELIMITER, open + LATEX_OPEN_DELIMITER.length);
    if (close < 0) {
      segments.push({ type: "text", value: source.slice(open) });
      break;
    }

    const rawExpression = source.slice(open + LATEX_OPEN_DELIMITER.length, close);
    const expression = rawExpression.trim();
    if (!expression || rawExpression.includes("\n")) {
      segments.push({ type: "text", value: source.slice(open, close + LATEX_CLOSE_DELIMITER.length) });
    } else {
      segments.push({ type: "math", value: expression });
    }

    cursor = close + LATEX_CLOSE_DELIMITER.length;
  }

  return segments;
};

const renderLatexNode = (node, latexSource) => {
  node.className = "latex-token";
  node.setAttribute("contenteditable", "false");
  node.dataset.latex = latexSource;

  if (window.katex && typeof window.katex.render === "function") {
    try {
      window.katex.render(latexSource, node, {
        throwOnError: false,
        displayMode: false
      });
      return;
    } catch {
      // Fallback below.
    }
  }

  node.textContent = `${LATEX_OPEN_DELIMITER}${latexSource}${LATEX_CLOSE_DELIMITER}`;
};

const transformLatexTextNode = (textNode) => {
  const source = textNode.nodeValue || "";
  if (!source.includes(LATEX_OPEN_DELIMITER)) return false;

  const segments = splitLatexSegments(source);
  const hasMath = segments.some((segment) => segment.type === "math");
  if (!hasMath) return false;

  const fragment = document.createDocumentFragment();
  for (const segment of segments) {
    if (!segment.value) continue;
    if (segment.type === "math") {
      const token = document.createElement("span");
      renderLatexNode(token, segment.value);
      fragment.append(token);
    } else {
      fragment.append(document.createTextNode(segment.value));
    }
  }

  textNode.parentNode.replaceChild(fragment, textNode);
  return true;
};

const createEditorCaretMarker = () => {
  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0 || !selection.isCollapsed) return null;
  const anchorNode = selection.anchorNode;
  if (!anchorNode || !editor.contains(anchorNode)) return null;

  const range = selection.getRangeAt(0).cloneRange();
  const marker = document.createElement("span");
  marker.dataset.caretMarker = "true";
  marker.textContent = "\u200b";
  range.insertNode(marker);

  const markerRange = document.createRange();
  markerRange.setStartAfter(marker);
  markerRange.collapse(true);
  selection.removeAllRanges();
  selection.addRange(markerRange);
  return marker;
};

const restoreEditorCaretFromMarker = (marker) => {
  if (!marker || !marker.parentNode) return;
  const selection = window.getSelection();
  if (selection) {
    const range = document.createRange();
    range.setStartAfter(marker);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
  }
  marker.remove();
};

const convertLatexTokenToEditableText = (token) => {
  if (!token || !token.classList || !token.classList.contains("latex-token")) return false;
  const source = (token.dataset.latex || "").trim();
  if (!source) return false;

  const textNode = document.createTextNode(`${LATEX_OPEN_DELIMITER}${source}${LATEX_CLOSE_DELIMITER}`);
  const parent = token.parentNode;
  if (!parent) return false;
  parent.replaceChild(textNode, token);

  const selection = window.getSelection();
  if (!selection) return false;
  const range = document.createRange();
  const offset = Math.max(LATEX_OPEN_DELIMITER.length, textNode.nodeValue.length - LATEX_CLOSE_DELIMITER.length);
  range.setStart(textNode, offset);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  return true;
};

const previousNodeInRoot = (node, root) => {
  if (!node || !root) return null;
  if (node.previousSibling) {
    let cursor = node.previousSibling;
    while (cursor && cursor.nodeType === Node.ELEMENT_NODE && cursor.lastChild) {
      cursor = cursor.lastChild;
    }
    return cursor;
  }

  const parent = node.parentNode;
  if (!parent || parent === root) return null;
  return parent;
};

const nextNodeInRoot = (node, root) => {
  if (!node || !root) return null;
  if (node.nodeType === Node.ELEMENT_NODE && node.firstChild) {
    return node.firstChild;
  }

  let cursor = node;
  while (cursor && cursor !== root) {
    if (cursor.nextSibling) {
      return cursor.nextSibling;
    }
    cursor = cursor.parentNode;
  }
  return null;
};

const latexTokenAdjacentToCaret = (direction) => {
  const marker = createEditorCaretMarker();
  if (!marker) return null;

  const step = direction < 0 ? previousNodeInRoot : nextNodeInRoot;
  let cursor = step(marker, editor);
  while (cursor) {
    if (cursor.nodeType === Node.TEXT_NODE) {
      if ((cursor.nodeValue || "").length > 0) {
        restoreEditorCaretFromMarker(marker);
        return null;
      }
      cursor = step(cursor, editor);
      continue;
    }

    if (cursor.nodeType !== Node.ELEMENT_NODE) {
      cursor = step(cursor, editor);
      continue;
    }

    const element = cursor;
    if (element.dataset && element.dataset.caretMarker === "true") {
      cursor = step(cursor, editor);
      continue;
    }

    const token = element.closest(".latex-token");
    if (token && editor.contains(token)) {
      token.remove();
      restoreEditorCaretFromMarker(marker);
      return token;
    }

    restoreEditorCaretFromMarker(marker);
    return null;
  }

  restoreEditorCaretFromMarker(marker);
  return null;
};

const renderInlineLatex = () => {
  const marker = createEditorCaretMarker();
  const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
  const nodes = [];

  while (walker.nextNode()) {
    const node = walker.currentNode;
    const parent = node.parentElement;
    if (!parent) continue;
    if (parent.closest(".latex-token, .citation-marker, [data-caret-marker='true']")) continue;
    if (parent.closest("[contenteditable='false']")) continue;
    if (!node.nodeValue || !node.nodeValue.includes(LATEX_OPEN_DELIMITER)) continue;
    nodes.push(node);
  }

  nodes.forEach((node) => {
    transformLatexTextNode(node);
  });

  if (marker) {
    restoreEditorCaretFromMarker(marker);
  }
};

const scheduleDeferredLatexRender = (delay = LATEX_RENDER_DELAY_MS) => {
  if (latexRenderTimer) {
    clearTimeout(latexRenderTimer);
  }
  latexRenderTimer = setTimeout(() => {
    latexRenderTimer = null;
    renderInlineLatex();
  }, Math.max(0, delay));
};

const flushDeferredLatexRender = () => {
  if (!latexRenderTimer) return;
  clearTimeout(latexRenderTimer);
  latexRenderTimer = null;
  renderInlineLatex();
};

const rerenderLatexTokens = () => {
  const tokens = Array.from(editor.querySelectorAll(".latex-token"));
  tokens.forEach((token) => {
    const source = token.dataset.latex || "";
    renderLatexNode(token, source);
  });
};

const getCaretRect = (ensureSelection = ensureSelectionOnSurface) => {
  if (typeof ensureSelection === "function") {
    ensureSelection();
  }

  const selection = window.getSelection();
  if (!selection || selection.rangeCount === 0) return null;

  const originalRange = selection.getRangeAt(0);
  const range = originalRange.cloneRange();
  range.collapse(true);

  const rect = range.getClientRects()[0];
  if (rect) return rect;

  const marker = document.createElement("span");
  marker.textContent = "\u200b";
  range.insertNode(marker);
  const markerRect = marker.getBoundingClientRect();
  marker.remove();
  selection.removeAllRanges();
  selection.addRange(originalRange);
  return markerRect;
};

const positionMenuUnderCaret = () => {
  if (!menuOpen) return;
  if (!isInsideFormattingSurface(getSelectionNode()) && !restoreMenuAnchorRange()) {
    ensureSelectionOnFormattingSurface();
  }
  if (!menuAnchorRange) {
    menuAnchorRange = captureMenuAnchorRange();
  }
  const rect = getCaretRect(ensureSelectionOnFormattingSurface);
  if (!rect) return;

  const menuWidth = formatMenu.offsetWidth || 360;
  const left = Math.min(window.scrollX + rect.left, window.scrollX + window.innerWidth - menuWidth - 12);
  const clampedLeft = Math.max(window.scrollX + 12, left);
  const top = window.scrollY + rect.bottom + 8;

  formatMenu.style.left = `${clampedLeft}px`;
  formatMenu.style.top = `${top}px`;
};

const closeMenuAndReset = () => {
  menuOpen = false;
  menuIndex = 0;
  menuAnchorRange = null;
  formatMenu.classList.remove("is-open");
  formatMenu.setAttribute("aria-hidden", "true");
  updateMenuVisuals();
};

const closeAllPanels = () => {
  deactivateGraphBlock();
  deactivateImageBlock();
  closeTableSidebar();
  closeInlineCommandMenu();
  closeSaveFormatBar();
  closeMenuAndReset();
  closeCitationSidebar();
  closeMediaStorageSidebar();
  closeMetadataPane();
  resetTabState();
  closeSectionFinder();
};

const openMenuAtCaret = () => {
  ensureSelectionOnFormattingSurface();
  menuAnchorRange = captureMenuAnchorRange();
  if (!menuAnchorRange) {
    return;
  }
  menuOpen = true;
  menuIndex = 0;
  formatMenu.classList.add("is-open");
  formatMenu.setAttribute("aria-hidden", "false");
  updateMenuVisuals();
  positionMenuUnderCaret();
};

const moveMenu = (step) => {
  if (!menuOpen) return;
  menuIndex = (menuIndex + step + MENU_ITEMS.length) % MENU_ITEMS.length;
  updateMenuVisuals();
};

const clearScheduledDraftPersist = () => {
  if (saveTimer) {
    clearTimeout(saveTimer);
    saveTimer = null;
  }
  if (draftPersistIdleHandle && typeof window.cancelIdleCallback === "function") {
    window.cancelIdleCallback(draftPersistIdleHandle);
    draftPersistIdleHandle = 0;
  }
};

const scheduleDraftPersist = () => {
  clearScheduledDraftPersist();
  saveTimer = setTimeout(() => {
    saveTimer = null;
    const runPersist = () => {
      draftPersistIdleHandle = 0;
      persistDraftNow();
    };

    if (typeof window.requestIdleCallback === "function") {
      draftPersistIdleHandle = window.requestIdleCallback(runPersist, { timeout: 280 });
      return;
    }

    runPersist();
  }, DRAFT_PERSIST_DELAY_MS);
};

const clearAutoSaveTimer = () => {
  if (!autoSaveTimer) return;
  clearTimeout(autoSaveTimer);
  autoSaveTimer = null;
};

const scheduleAutoSaveToFile = () => {
  if (!currentFileHandle && !currentNativeFilePath) {
    clearAutoSaveTimer();
    return;
  }

  autoSaveQueuedRevision = editRevision;
  if (autoSaveInFlight) return;

  clearAutoSaveTimer();
  autoSaveTimer = setTimeout(() => {
    runAutoSaveToFile();
  }, AUTO_SAVE_DELAY_MS);
};

const runAutoSaveToFile = async () => {
  clearAutoSaveTimer();
  if ((!currentFileHandle && !currentNativeFilePath) || !hasUnsavedChanges || autoSaveInFlight) return;

  autoSaveInFlight = true;
  const tokenAtStart = activeDocumentToken;
  const handleAtStart = currentFileHandle;
  const nativePathAtStart = currentNativeFilePath;
  const useNativePath = Boolean(nativePathAtStart && supportsDesktopBridge());
  const queuedRevision = autoSaveQueuedRevision || editRevision;
  const payloadText = JSON.stringify(createPaperPayload(), null, 2);

  try {
    if (useNativePath) {
      const wrote = await desktopBridge.writeTextFile({ filePath: nativePathAtStart, text: payloadText });
      if (!wrote) {
        throw new Error("Desktop autosave failed.");
      }
      if (activeDocumentToken !== tokenAtStart || currentNativeFilePath !== nativePathAtStart) return;
      currentFileName = ensurePaperExtension(fileNameFromPath(nativePathAtStart) || currentFileName);
    } else if (handleAtStart) {
      const writable = await handleAtStart.createWritable();
      await writable.write(payloadText);
      await writable.close();
      if (activeDocumentToken !== tokenAtStart || currentFileHandle !== handleAtStart) return;
      currentFileName = ensurePaperExtension(handleAtStart.name || currentFileName);
    } else {
      return;
    }

    if (editRevision <= queuedRevision) {
      setDirty(false);
      persistDraftNow();
    }
  } catch {
    // Ignore autosave write errors; manual save remains available.
  } finally {
    autoSaveInFlight = false;

    if (activeDocumentToken !== tokenAtStart) {
      if ((currentFileHandle || currentNativeFilePath) && hasUnsavedChanges) {
        scheduleAutoSaveToFile();
      }
      return;
    }

    if ((currentFileHandle || currentNativeFilePath) && hasUnsavedChanges && editRevision > queuedRevision) {
      scheduleAutoSaveToFile();
    }
  }
};

const markDocumentChanged = (options = {}) => {
  const deferPageGuides = Boolean(options && options.deferPageGuides);
  editRevision += 1;
  setDirty(true);
  scheduleDraftPersist();
  scheduleAutoSaveToFile();
  scheduleWindowStatus(false);
  scheduleWordCountRefresh();
  if (deferPageGuides) return;
  scheduleAutoPageBreakGuidesSoft();
};

const serializeFeatureState = () => {
  const state = {};
  for (const [key, value] of Object.entries(featureStateBag)) {
    state[key] = value;
  }

  const adapters = { ...preservedAdapterState };
  for (const [name, adapter] of featureAdapters.entries()) {
    if (typeof adapter.serialize !== "function") continue;
    try {
      const nextState = adapter.serialize();
      if (typeof nextState === "undefined") {
        delete adapters[name];
      } else {
        adapters[name] = nextState;
      }
    } catch {
      // Ignore adapter serialization failures so core save still succeeds.
    }
  }

  return { state, adapters };
};

const createPaperPayload = () => {
  return {
    format: PAPER_FORMAT,
    version: PAPER_VERSION,
    savedAt: new Date().toISOString(),
    document: {
      titleHtml: titleField.innerHTML,
      bodyHtml: getPersistableEditorHtml()
    },
    features: serializeFeatureState(),
    meta: {
      paragraphSeparator: "p"
    }
  };
};

const persistDraftNow = () => {
  const draft = {
    payload: createPaperPayload(),
    session: {
      fileName: ensurePaperExtension(currentFileName),
      hasUnsavedChanges
    }
  };

  try {
    localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
  } catch {
    // Ignore quota/storage errors.
  }
};

const applyPendingAdapterState = () => {
  for (const [name, adapter] of featureAdapters.entries()) {
    if (typeof adapter.deserialize !== "function") continue;
    if (!Object.prototype.hasOwnProperty.call(pendingAdapterState, name)) continue;
    try {
      adapter.deserialize(pendingAdapterState[name]);
    } catch {
      // Ignore adapter hydrate failures to avoid blocking load.
    }
  }
};

const setFeatureStateBag = (nextState) => {
  for (const key of Object.keys(featureStateBag)) {
    delete featureStateBag[key];
  }
  if (!nextState || typeof nextState !== "object") return;
  for (const [key, value] of Object.entries(nextState)) {
    featureStateBag[key] = value;
  }
};

const normalizePaperPayload = (raw) => {
  if (!raw || typeof raw !== "object") {
    throw new Error("Invalid .paper payload.");
  }

  if (raw.format !== PAPER_FORMAT) {
    throw new Error("Unsupported file format.");
  }

  const sourceDocument = raw.document && typeof raw.document === "object" ? raw.document : {};
  const sourceFeatures = raw.features && typeof raw.features === "object" ? raw.features : {};
  const sourceState = sourceFeatures.state && typeof sourceFeatures.state === "object" ? sourceFeatures.state : {};
  const sourceAdapters =
    sourceFeatures.adapters && typeof sourceFeatures.adapters === "object" ? sourceFeatures.adapters : {};

  const bodyHtml =
    typeof sourceDocument.bodyHtml === "string" && sourceDocument.bodyHtml.trim()
      ? sourceDocument.bodyHtml
      : "<p><br></p>";

  return {
    format: PAPER_FORMAT,
    version: typeof raw.version === "number" ? raw.version : 1,
    savedAt: typeof raw.savedAt === "string" ? raw.savedAt : "",
    document: {
      titleHtml: typeof sourceDocument.titleHtml === "string" ? sourceDocument.titleHtml : "",
      bodyHtml
    },
    features: {
      state: sourceState,
      adapters: sourceAdapters
    }
  };
};

const SAFE_PAPER_DROP_TAGS = new Set([
  "script",
  "style",
  "iframe",
  "frame",
  "object",
  "embed",
  "meta",
  "link",
  "base",
  "form",
  "input",
  "button",
  "select",
  "option",
  "textarea"
]);
const SAFE_PAPER_INLINE_TAGS = new Set(["a", "b", "br", "del", "em", "i", "s", "span", "strike", "strong", "sub", "sup", "u"]);
const SAFE_PAPER_BODY_TAGS = new Set(["blockquote", "div", "h2", "h3", "h4", "h5", "li", "ol", "p", "ul"]);
const SAFE_PAPER_TABLE_STAT_KINDS = new Set(["col-mean", "col-std", "row-mean", "row-std"]);
const MAX_SANITIZED_TABLE_ROWS = 200;
const MAX_SANITIZED_TABLE_COLS = 50;

const sanitizePaperTextValue = (value) => String(value || "").replace(/\u0000/g, "");

const sanitizePaperToken = (value, options = {}) => {
  const { pattern = /[^a-z0-9._:-]/gi, maxLength = 160 } = options;
  const normalized = String(value || "").replace(pattern, "").slice(0, maxLength);
  return normalized;
};

const normalizeSafeFontSize = (value) => {
  const raw = String(value || "").trim();
  const match = raw.match(/^([0-9]+(?:\.[0-9]+)?)(px|pt|em|rem|%)$/i);
  if (!match) return "";
  const amount = Number(match[1]);
  const unit = match[2].toLowerCase();
  if (!Number.isFinite(amount) || amount <= 0) return "";
  if ((unit === "px" && (amount < 8 || amount > 96)) || (unit === "pt" && (amount < 6 || amount > 72))) {
    return "";
  }
  if ((unit === "em" || unit === "rem") && (amount < 0.5 || amount > 6)) {
    return "";
  }
  if (unit === "%" && (amount < 50 || amount > 600)) {
    return "";
  }
  return `${amount}${unit}`;
};

const sanitizePaperInlineStyle = (value, options = {}) => {
  const { allowTextAlign = true, allowFontSize = true } = options;
  const probe = document.createElement("span");
  probe.setAttribute("style", String(value || ""));
  const output = [];

  if (allowTextAlign) {
    const rawAlign = String(probe.style.textAlign || "").trim();
    const align = rawAlign ? normalizeParagraphAlignment(rawAlign) : "";
    if (align && PARAGRAPH_ALIGNMENTS.has(align)) {
      output.push(`text-align: ${align}`);
    }
  }

  if (allowFontSize) {
    const fontSize = normalizeSafeFontSize(probe.style.fontSize || "");
    if (fontSize) {
      output.push(`font-size: ${fontSize}`);
    }
  }

  return output.join("; ");
};

const sanitizePaperHref = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  try {
    const parsed = new URL(raw, window.location.href);
    if (parsed.protocol === "http:" || parsed.protocol === "https:" || parsed.protocol === "mailto:" || parsed.protocol === "tel:") {
      return raw;
    }
  } catch {
    return "";
  }
  return "";
};

const sanitizePaperImageSource = (value) => {
  const raw = String(value || "").trim();
  if (!raw) return "";
  if (/^blob:/i.test(raw)) return raw;
  if (/^data:image\/[a-z0-9.+-]+;base64,[a-z0-9+/=\s]+$/i.test(raw)) return raw;
  try {
    const parsed = new URL(raw, window.location.href);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return raw;
    }
  } catch {
    return "";
  }
  return "";
};

const sanitizePaperNodes = (nodeList, mode) => {
  const sanitized = [];
  Array.from(nodeList || []).forEach((node) => {
    sanitized.push(...sanitizePaperNode(node, mode));
  });
  return sanitized;
};

const appendSanitizedPaperChildren = (source, target, mode) => {
  sanitizePaperNodes(source.childNodes, mode).forEach((child) => target.append(child));
};

const sanitizeCitationMarkerElement = (source) => {
  const marker = document.createElement("span");
  marker.className = "citation-marker";
  marker.setAttribute("contenteditable", "false");
  const citationId = sanitizePaperToken(source.dataset.citeId || "", {
    pattern: /[^a-z0-9_-]/gi,
    maxLength: 120
  });
  if (citationId) {
    marker.dataset.citeId = citationId;
  }
  const citationOrder = Number.parseInt(source.dataset.citeOrder || source.textContent || "", 10);
  if (Number.isFinite(citationOrder) && citationOrder > 0) {
    marker.dataset.citeOrder = String(citationOrder);
    marker.textContent = String(citationOrder);
  } else {
    marker.textContent = sanitizePaperTextValue(source.textContent).replace(/\s+/g, " ").trim();
  }
  return marker;
};

const sanitizeLatexTokenElement = (source) => {
  const latexSource = sanitizePaperTextValue(source.dataset.latex || source.textContent).trim();
  if (!latexSource) return null;
  const token = document.createElement("span");
  renderLatexNode(token, latexSource);
  return token;
};

const sanitizeGraphBlockElement = (source) => {
  const state = normalizeGraphState(readGraphState(source));
  const block = createGraphBlock(state);
  if (!(block instanceof HTMLElement)) return null;
  return block;
};

const sanitizeImageBlockElement = (source) => {
  const state = readImageState(source);
  const src = sanitizePaperImageSource(state.src);
  if (!src) return null;
  return createImageBlock({
    src,
    alt: sanitizePaperTextValue(state.alt).trim(),
    caption: sanitizePaperTextValue(state.caption).replace(/\s+/g, " ").trim(),
    align: normalizeImageAlign(state.align),
    wrap: normalizeImageWrap(state.wrap),
    width: normalizeImageWidth(state.width, state.wrap)
  });
};

const sanitizePageAssistElement = (source) => {
  const assist = document.createElement("div");
  assist.className = "page-assist";
  assist.dataset.pageAssist = "true";
  const kind = normalizePageAssistKind(source);
  const pageNumber = Math.max(1, Number.parseInt(source.dataset.pageIndex || "1", 10) || 1);
  const align = normalizeParagraphAlignment(source.dataset.align || source.style.textAlign || source.getAttribute("align") || "right");
  assist.dataset.pageKind = kind;
  assist.dataset.pageIndex = String(pageNumber);
  assist.dataset.align = align;
  assist.dataset.placeholder = resolveAssistPlaceholder(kind);
  if (kind === "page-number") {
    assist.dataset.pageNumberPosition = normalizePageNumberPosition(source.dataset.pageNumberPosition, "bottom");
  }
  assist.dataset.pageRepeatAuto = source.dataset.pageRepeatAuto === "true" ? "true" : "false";
  if (source.dataset.pageRepeatManual === "true") {
    assist.dataset.pageRepeatManual = "true";
  }
  if (source.dataset.pageNumberAuto === "true") {
    assist.dataset.pageNumberAuto = "true";
    assist.dataset.pageNumberFormat = normalizePageNumberFormat(
      source.dataset.pageNumberFormat || inferPageNumberFormatFromText(source.textContent || "")
    );
  } else if (source.dataset.pageNumberManual === "true") {
    assist.dataset.pageNumberManual = "true";
  }
  assist.style.textAlign = align;
  assist.setAttribute("aria-label", `${resolveAssistPlaceholder(kind)} for page ${pageNumber}`);
  appendSanitizedPaperChildren(source, assist, "title");
  return assist;
};

const sanitizeEditorTableElement = (source) => {
  if (!(source instanceof HTMLTableElement)) return null;
  const sourceRows = tableRows(source).slice(0, MAX_SANITIZED_TABLE_ROWS);
  const columnCount = Math.max(
    1,
    Math.min(
      MAX_SANITIZED_TABLE_COLS,
      sourceRows.reduce((max, row) => Math.max(max, row.cells.length), 0)
    )
  );

  const table = document.createElement("table");
  table.className = "editor-table";
  table.dataset.paperTable = "true";
  table.setAttribute("draggable", "true");
  const safeStyle = sanitizePaperInlineStyle(source.getAttribute("style") || "", {
    allowTextAlign: false,
    allowFontSize: true
  });
  if (safeStyle) {
    table.setAttribute("style", safeStyle);
  }

  const caption = document.createElement("caption");
  caption.className = "editor-table-caption";
  const sourceCaption = source.querySelector("caption");
  const captionText = sanitizePaperTextValue(sourceCaption ? sourceCaption.textContent : "")
    .replace(/\u00a0/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  caption.textContent = captionText || "Table caption";
  table.append(caption);

  const tbody = document.createElement("tbody");
  if (sourceRows.length === 0) {
    const fallback = buildDefaultEditorTable();
    return fallback instanceof HTMLTableElement ? fallback : table;
  }

  sourceRows.forEach((sourceRow, rowIndex) => {
    const row = document.createElement("tr");
    const rowKind = String(sourceRow.dataset.tableStatRow || "").trim().toLowerCase();
    if (SAFE_PAPER_TABLE_STAT_KINDS.has(rowKind)) {
      row.dataset.tableStatRow = rowKind;
    }
    for (let colIndex = 0; colIndex < columnCount; colIndex += 1) {
      const sourceCell = sourceRow.cells[colIndex];
      const cell = document.createElement(rowIndex === 0 ? "th" : "td");
      const cellText = sanitizePaperTextValue(sourceCell ? sourceCell.textContent : "")
        .replace(/\u00a0/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (cellText) {
        cell.textContent = cellText;
      } else {
        cell.innerHTML = "<br>";
      }
      const columnKind = String(sourceCell instanceof HTMLElement ? sourceCell.dataset.tableStatCol || "" : "")
        .trim()
        .toLowerCase();
      if (SAFE_PAPER_TABLE_STAT_KINDS.has(columnKind)) {
        cell.dataset.tableStatCol = columnKind;
      }
      if (sourceCell instanceof HTMLElement && sourceCell.dataset.tableUncertainty === "true") {
        cell.dataset.tableUncertainty = "true";
      }
      row.append(cell);
    }
    tbody.append(row);
  });
  table.append(tbody);
  return table;
};

const sanitizePaperNode = (node, mode) => {
  if (!node) return [];
  if (node.nodeType === Node.TEXT_NODE) {
    return [document.createTextNode(sanitizePaperTextValue(node.nodeValue))];
  }
  if (node.nodeType !== Node.ELEMENT_NODE) return [];

  const element = node;
  const tagName = element.tagName.toLowerCase();

  if (mode !== "title") {
    if (element.classList.contains("graph-block")) {
      const block = sanitizeGraphBlockElement(element);
      return block ? [block] : [];
    }
    if (element.classList.contains("image-block")) {
      const block = sanitizeImageBlockElement(element);
      return block ? [block] : [];
    }
    if (element.classList.contains("page-break-block")) {
      return [createPageBreakBlock()];
    }
    if (element.classList.contains("page-assist")) {
      return [sanitizePageAssistElement(element)];
    }
    if (element.classList.contains("citation-marker")) {
      return [sanitizeCitationMarkerElement(element)];
    }
    if (element.classList.contains("latex-token")) {
      const token = sanitizeLatexTokenElement(element);
      return token ? [token] : [];
    }
    if (tagName === "table" && !element.closest(".graph-block, .image-block")) {
      const table = sanitizeEditorTableElement(element);
      return table ? [table] : [];
    }
  } else {
    if (element.classList.contains("citation-marker")) {
      return [sanitizeCitationMarkerElement(element)];
    }
    if (element.classList.contains("latex-token")) {
      const token = sanitizeLatexTokenElement(element);
      return token ? [token] : [];
    }
  }

  if (SAFE_PAPER_DROP_TAGS.has(tagName)) {
    return [];
  }

  if (mode === "title") {
    if (tagName === "br") {
      return [document.createElement("br")];
    }
    if (!SAFE_PAPER_INLINE_TAGS.has(tagName)) {
      return sanitizePaperNodes(element.childNodes, "title");
    }
  } else if (!SAFE_PAPER_BODY_TAGS.has(tagName) && !SAFE_PAPER_INLINE_TAGS.has(tagName)) {
    return sanitizePaperNodes(element.childNodes, "body");
  }

  const clean = document.createElement(tagName);
  const safeStyle = sanitizePaperInlineStyle(element.getAttribute("style") || "");
  if (safeStyle) {
    clean.setAttribute("style", safeStyle);
  }

  if (tagName === "a") {
    const href = sanitizePaperHref(element.getAttribute("href"));
    if (href) {
      clean.setAttribute("href", href);
      clean.setAttribute("rel", "noopener noreferrer");
    }
  }

  if (tagName === "ol") {
    const start = Number.parseInt(element.getAttribute("start") || "", 10);
    if (Number.isFinite(start) && start > 0) {
      clean.setAttribute("start", String(start));
    }
  }

  appendSanitizedPaperChildren(element, clean, mode === "title" ? "title" : "body");
  return [clean];
};

const sanitizePaperFragment = (html, mode = "body") => {
  const template = document.createElement("template");
  template.innerHTML = typeof html === "string" ? html : "";
  const fragment = document.createDocumentFragment();
  sanitizePaperNodes(template.content.childNodes, mode).forEach((node) => fragment.append(node));
  return fragment;
};

const hydrateFromPayload = (payload, options = {}) => {
  const { fileName = DEFAULT_FILE_NAME, isDirty = false, keepHandle = false, keepNativePath = false } = options;
  activeDocumentToken += 1;
  clearScheduledDraftPersist();
  clearAutoSaveTimer();
  clearMediaStoragePersistTimer();
  if (wordCountRefreshTimer) {
    clearTimeout(wordCountRefreshTimer);
    wordCountRefreshTimer = null;
  }
  if (latexRenderTimer) {
    clearTimeout(latexRenderTimer);
    latexRenderTimer = null;
  }
  if (softPageGuideTimer) {
    clearTimeout(softPageGuideTimer);
    softPageGuideTimer = null;
  }
  if (typingPageGuideTimer) {
    clearTimeout(typingPageGuideTimer);
    typingPageGuideTimer = null;
  }
  if (mediaSyncFrame) {
    window.cancelAnimationFrame(mediaSyncFrame);
    mediaSyncFrame = 0;
    mediaSyncNeedsRenumber = false;
  }
  editRevision = 0;
  autoSaveQueuedRevision = 0;

  const sanitizedTitle = sanitizePaperFragment(payload.document.titleHtml, "title");
  const sanitizedBody = sanitizePaperFragment(payload.document.bodyHtml, "body");
  if (sanitizedBody.childNodes.length === 0) {
    const paragraph = document.createElement("p");
    paragraph.innerHTML = "<br>";
    sanitizedBody.append(paragraph);
  }

  titleField.replaceChildren(sanitizedTitle);
  editor.replaceChildren(sanitizedBody);
  normalizeEditorTopLevelBlockStructure();
  stripTransientPageFlowState(editor, true);
  setFeatureStateBag(payload.features.state);
  pendingAdapterState = payload.features.adapters;
  preservedAdapterState = { ...payload.features.adapters };
  syncFeatureUiFromState();
  syncGraphBlocks();
  syncImageBlocks();
  syncTableNumbers();
  applyPendingAdapterState();

  currentFileName = ensurePaperExtension(fileName);
  if (!keepHandle) {
    currentFileHandle = null;
  }
  if (!keepNativePath) {
    currentNativeFilePath = "";
  }

  closeAllPanels();
  setDirty(isDirty);
  persistDraftNow();
  scheduleWindowStatus(true);
};

const registerFeaturePersistence = (name, adapter) => {
  if (!name || typeof name !== "string") return;
  const safeAdapter = adapter && typeof adapter === "object" ? adapter : {};
  featureAdapters.set(name, safeAdapter);

  if (typeof safeAdapter.deserialize === "function" && Object.prototype.hasOwnProperty.call(pendingAdapterState, name)) {
    try {
      safeAdapter.deserialize(pendingAdapterState[name]);
    } catch {
      // Ignore adapter hydrate failures.
    }
  }
};

const setFeatureState = (name, value) => {
  if (!name || typeof name !== "string") return;
  featureStateBag[name] = value;
  markDocumentChanged();
};

const getFeatureState = (name) => {
  return featureStateBag[name];
};

const syncFeatureUiFromState = () => {
  citations = normalizeCitationList(getFeatureState("citations"));
  const featureMediaSlots = normalizeMediaStorageSlots(getFeatureState("mediaStorage"));
  if (featureMediaSlots.some((entry) => Boolean(entry))) {
    mediaStorageSlots = featureMediaSlots;
    persistGlobalMediaStorageSlots(featureMediaSlots);
  } else {
    const fallbackMediaSlots = loadGlobalMediaStorageSlots();
    mediaStorageSlots = fallbackMediaSlots;
    if (fallbackMediaSlots.some((entry) => Boolean(entry))) {
      featureStateBag.mediaStorage = fallbackMediaSlots;
    }
  }
  const referencesHeadingText = normalizeReferencesHeading(getFeatureState("referencesHeading"));

  const metadata = getFeatureState("metadata");
  const citationFormat = metadata && typeof metadata === "object" ? normalizeCitationFormat(metadata.citationFormat) : "MLA";
  const pageSize = metadata && typeof metadata === "object" ? normalizePageSize(metadata.pageSize) : "endless";
  const pageOrientation =
    metadata && typeof metadata === "object" ? normalizePageOrientation(metadata.pageOrientation) : "portrait";
  const pageMargins =
    metadata && typeof metadata === "object"
      ? normalizePageMargins(metadata.pageMargins)
      : { ...DEFAULT_PAGE_MARGINS_IN };
  metadataSettings = {
    citationFormat,
    pageSize,
    pageOrientation,
    pageMargins
  };

  citationFormatSelect.value = citationFormat;
  pageSizeSelect.value = pageSize;
  pageOrientationSelect.value = pageOrientation;
  syncMarginInputs(pageMargins);
  applyPageLayout();
  if (referencesHeading) {
    referencesHeading.textContent = referencesHeadingText;
  }
  renderCitationList();
  syncCitationPreview();
  renderMediaStorageSidebar();
  refreshCitationMarkersAndReferences();
  rerenderLatexTokens();
  renderInlineLatex();
};

const isSelectionInFormattingSurface = () => {
  return isInsideFormattingSurface(getSelectionNode());
};

const execCommandSafe = (command, value = null) => {
  try {
    return document.execCommand(command, false, value);
  } catch {
    return false;
  }
};

const runFormattingCommand = (command) => {
  if (command === "heading") {
    return execCommandSafe("formatBlock", isHeadingActive() ? "p" : "h2");
  }
  if (command === "highlight-yellow") {
    return toggleYellowHighlight();
  }
  if (command === "subtitle") {
    return execCommandSafe("formatBlock", isSubtitleActive() ? "p" : "h5");
  }
  if (command === "superscript") {
    const isSuper = queryState("superscript");
    if (!isSuper && queryState("subscript")) {
      execCommandSafe("subscript");
    }
    return execCommandSafe("superscript");
  }
  if (command === "subscript") {
    const isSub = queryState("subscript");
    if (!isSub && queryState("superscript")) {
      execCommandSafe("superscript");
    }
    return execCommandSafe("subscript");
  }
  if (
    command === "justifyLeft" ||
    command === "justifyCenter" ||
    command === "justifyRight" ||
    command === "justifyFull"
  ) {
    return execCommandSafe(command, null);
  }
  return execCommandSafe(command);
};

const readFormattingCommandState = (command) => {
  if (command === "heading") return isHeadingActive();
  if (command === "subtitle") return isSubtitleActive();
  if (command === "highlight-yellow") return isHighlightActive();
  if (
    command === "bold" ||
    command === "underline" ||
    command === "italic" ||
    command === "strikeThrough" ||
    command === "superscript" ||
    command === "subscript" ||
    command === "justifyLeft" ||
    command === "justifyCenter" ||
    command === "justifyRight" ||
    command === "justifyFull" ||
    command === "insertUnorderedList" ||
    command === "insertOrderedList"
  ) {
    return queryState(command);
  }
  return null;
};

const executeEditorCommand = (command) => {
  let targetRange = null;
  if (menuOpen) {
    const restoredFromAnchor = restoreMenuAnchorRange();
    if (!restoredFromAnchor && !isSelectionInFormattingSurface()) {
      ensureSelectionOnFormattingSurface();
    }
    if (!restoreMenuAnchorRange() && !isSelectionInFormattingSurface()) {
      updateMenuVisuals();
      return false;
    }
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      targetRange = selection.getRangeAt(0).cloneRange();
    }
  } else {
    ensureSelectionOnFormattingSurface();
  }

  const beforeState = readFormattingCommandState(command);
  let applied = runFormattingCommand(command);
  let afterState = readFormattingCommandState(command);
  if (!applied && beforeState !== null && afterState !== null && beforeState !== afterState) {
    applied = true;
  }
  if (!applied && menuOpen) {
    const retriedRange = (targetRange && restoreSelectionRange(targetRange)) || restoreMenuAnchorRange();
    if (retriedRange || isSelectionInFormattingSurface()) {
      applied = runFormattingCommand(command);
      afterState = readFormattingCommandState(command);
      if (!applied && beforeState !== null && afterState !== null && beforeState !== afterState) {
        applied = true;
      }
    }
  }

  if (!applied) {
    updateMenuVisuals();
    return false;
  }

  let nextRange = captureMenuAnchorRange();
  if (menuOpen && targetRange && !targetRange.collapsed) {
    const selection = window.getSelection();
    const hasExpandedSelection = Boolean(selection && selection.rangeCount > 0 && !selection.getRangeAt(0).collapsed);
    if (!hasExpandedSelection && restoreSelectionRange(targetRange)) {
      nextRange = captureMenuAnchorRange() || targetRange.cloneRange();
    }
  }
  menuAnchorRange = nextRange;
  markDocumentChanged();
  updateMenuVisuals();
  if (menuOpen) {
    positionMenuUnderCaret();
  }
  return true;
};

const applyMenuOption = () => {
  if (!menuOpen) return;
  const option = MENU_ITEMS[menuIndex];
  if (!option) return;
  executeEditorCommand(option.command);
};

const resolveShortcutCommand = (event) => {
  if (!isInsideFormattingSurface(getSelectionNode())) return null;

  const hasMod = event.metaKey || event.ctrlKey;
  if (!hasMod || event.altKey) return null;

  const key = event.key.toLowerCase();
  const shift = event.shiftKey;

  if (!shift && key === "b") return "bold";
  if (!shift && key === "i") return "italic";
  if (!shift && key === "u") return "underline";
  if (shift && key === "x") return "strikeThrough";
  if (shift && (key === "8" || key === "*")) return "insertUnorderedList";
  if (shift && (key === "7" || key === "&")) return "insertOrderedList";
  if (shift && key === "5") return "subtitle";
  if (shift && key === "l") return "justifyLeft";
  if (shift && key === "e") return "justifyCenter";
  if (shift && key === "r") return "justifyRight";
  if (shift && key === "j") return "justifyFull";
  if (!shift && key === ".") return "superscript";
  if (!shift && key === ",") return "subscript";
  if (shift && key === "=") return "superscript";
  if (!shift && key === "=") return "subscript";

  return null;
};

const triggerDownload = (blob, fileName) => {
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = fileName;
  document.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
};

const blobToBase64 = async (blob) => {
  const arrayBuffer = await blob.arrayBuffer();
  const bytes = new Uint8Array(arrayBuffer);
  let binary = "";
  const chunkSize = 0x8000;
  for (let index = 0; index < bytes.length; index += chunkSize) {
    const chunk = bytes.subarray(index, index + chunkSize);
    binary += String.fromCharCode(...chunk);
  }
  return btoa(binary);
};

const saveBlobFile = async ({ blob, suggestedName, description, mime, extensions }) => {
  if (supportsDesktopBridge()) {
    const filePath = await desktopBridge.pickSavePath({
      suggestedName,
      filters: [
        {
          name: description,
          extensions: normalizeDialogExtensions(extensions)
        }
      ]
    });
    if (!filePath) return false;
    const base64 = await blobToBase64(blob);
    const wrote = await desktopBridge.writeBinaryFile({ filePath, base64 });
    if (!wrote) {
      throw new Error("Desktop binary save failed.");
    }
    return true;
  }

  if ("showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName,
        types: [
          {
            description,
            accept: {
              [mime]: extensions,
              "application/octet-stream": extensions
            }
          }
        ]
      });
      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return true;
    } catch (error) {
      if (error && error.name === "AbortError") return false;
      throw error;
    }
  }

  triggerDownload(blob, suggestedName);
  return true;
};

const downloadPaperFallback = (payloadText) => {
  const blob = new Blob([payloadText], { type: PAPER_MIME });
  triggerDownload(blob, ensurePaperExtension(currentFileName));
};

const savePaper = async (forceChooseLocation = false) => {
  flushDeferredLatexRender();
  const payloadText = JSON.stringify(createPaperPayload(), null, 2);
  const tokenAtSaveStart = activeDocumentToken;
  const revisionAtSaveStart = editRevision;
  clearAutoSaveTimer();
  autoSaveQueuedRevision = editRevision;

  try {
    if (supportsDesktopBridge()) {
      let filePath = currentNativeFilePath;
      if (forceChooseLocation || !filePath) {
        filePath = await desktopBridge.pickSavePath({
          suggestedName: ensurePaperExtension(currentFileName),
          filters: [
            {
              name: "Paper Document",
              extensions: ["paper"]
            }
          ]
        });
      }
      if (!filePath) {
        if (currentFileHandle || currentNativeFilePath) {
          scheduleAutoSaveToFile();
        }
        return;
      }
      const wrote = await desktopBridge.writeTextFile({ filePath, text: payloadText });
      if (!wrote) {
        throw new Error("Desktop paper save failed.");
      }
      currentNativeFilePath = filePath;
      currentFileHandle = null;
      currentFileName = ensurePaperExtension(fileNameFromPath(filePath) || currentFileName);
    } else if ("showSaveFilePicker" in window) {
      if (forceChooseLocation || !currentFileHandle) {
        currentFileHandle = await window.showSaveFilePicker({
          suggestedName: ensurePaperExtension(currentFileName),
          types: [
            {
              description: "Paper Document",
              accept: {
                [PAPER_MIME]: [".paper"],
                "application/json": [".paper"]
              }
            }
          ]
        });
      }

      const writable = await currentFileHandle.createWritable();
      await writable.write(payloadText);
      await writable.close();
      currentNativeFilePath = "";
      currentFileName = ensurePaperExtension(currentFileHandle.name || currentFileName);
    } else {
      downloadPaperFallback(payloadText);
      currentNativeFilePath = "";
    }

    if (activeDocumentToken !== tokenAtSaveStart) return;
    if (editRevision === revisionAtSaveStart) {
      setDirty(false);
    } else {
      setDirty(true);
      scheduleAutoSaveToFile();
    }
    persistDraftNow();
  } catch (error) {
    if (error && error.name === "AbortError") {
      if ((currentFileHandle || currentNativeFilePath) && hasUnsavedChanges) {
        scheduleAutoSaveToFile();
      }
      return;
    }
    if ((currentFileHandle || currentNativeFilePath) && hasUnsavedChanges) {
      scheduleAutoSaveToFile();
    }
    window.alert("Could not save the .paper file.");
  }
};

const parsePaperFileText = (text) => {
  let raw;
  try {
    raw = JSON.parse(text);
  } catch {
    throw new Error("File is not valid JSON.");
  }
  return normalizePaperPayload(raw);
};

const openPaperFallback = () => {
  return new Promise((resolve, reject) => {
    fileInput.value = "";
    let settled = false;

    const finish = (handler, value) => {
      if (settled) return;
      settled = true;
      fileInput.onchange = null;
      window.removeEventListener("focus", handleWindowFocus, true);
      handler(value);
    };

    const handleWindowFocus = () => {
      setTimeout(() => {
        if (!fileInput.files || fileInput.files.length === 0) {
          finish(resolve, null);
        }
      }, 150);
    };

    fileInput.onchange = async () => {
      const [file] = fileInput.files || [];
      if (!file) {
        finish(resolve, null);
        return;
      }

      try {
        const payload = parsePaperFileText(await file.text());
        finish(resolve, { payload, fileName: ensurePaperExtension(file.name), handle: null });
      } catch (error) {
        finish(reject, error);
      }
    };

    window.addEventListener("focus", handleWindowFocus, true);
    fileInput.click();
  });
};

const openPaper = async () => {
  try {
    let result = null;

    if (supportsDesktopBridge()) {
      const filePath = await desktopBridge.pickOpenPath({
        filters: [
          {
            name: "Paper Document",
            extensions: ["paper", "json", "txt"]
          }
        ]
      });
      if (!filePath) return;
      const text = await desktopBridge.readTextFile({ filePath });
      const payload = parsePaperFileText(text);
      result = {
        payload,
        fileName: ensurePaperExtension(fileNameFromPath(filePath)),
        handle: null,
        nativePath: filePath
      };
    } else if ("showOpenFilePicker" in window) {
      const [handle] = await window.showOpenFilePicker({
        multiple: false,
        types: [
          {
            description: "Paper Document",
            accept: {
              [PAPER_MIME]: [".paper"],
              "application/json": [".paper"],
              "text/plain": [".paper"]
            }
          }
        ]
      });

      if (!handle) return;
      const file = await handle.getFile();
      const payload = parsePaperFileText(await file.text());
      result = { payload, fileName: ensurePaperExtension(file.name), handle, nativePath: "" };
    } else {
      result = await openPaperFallback();
    }

    if (!result) return;

    currentFileHandle = result.handle;
    currentNativeFilePath = String(result.nativePath || "");
    hydrateFromPayload(result.payload, {
      fileName: result.fileName,
      isDirty: false,
      keepHandle: Boolean(result.handle),
      keepNativePath: Boolean(result.nativePath)
    });

    if (!titleField.textContent.trim()) {
      titleField.focus({ preventScroll: true });
    } else {
      focusEditorAtEnd();
    }
    updateMenuVisuals();
  } catch (error) {
    if (error && error.name === "AbortError") return;
    window.alert("Could not open that .paper file.");
  }
};

const cloneInlineStyle = (style = BASE_INLINE_STYLE) => {
  return {
    bold: Boolean(style.bold),
    italic: Boolean(style.italic),
    underline: Boolean(style.underline),
    strike: Boolean(style.strike),
    superscript: Boolean(style.superscript),
    subscript: Boolean(style.subscript)
  };
};

const styleFromTag = (tagName, style) => {
  const next = cloneInlineStyle(style);

  if (tagName === "b" || tagName === "strong") next.bold = true;
  if (tagName === "i" || tagName === "em") next.italic = true;
  if (tagName === "u") next.underline = true;
  if (tagName === "s" || tagName === "strike" || tagName === "del") next.strike = true;
  if (tagName === "sup") {
    next.superscript = true;
    next.subscript = false;
  }
  if (tagName === "sub") {
    next.subscript = true;
    next.superscript = false;
  }

  return next;
};

const runsHaveSameStyle = (left, right) => {
  return (
    Boolean(left.bold) === Boolean(right.bold) &&
    Boolean(left.italic) === Boolean(right.italic) &&
    Boolean(left.underline) === Boolean(right.underline) &&
    Boolean(left.strike) === Boolean(right.strike) &&
    Boolean(left.superscript) === Boolean(right.superscript) &&
    Boolean(left.subscript) === Boolean(right.subscript) &&
    String(left.citationId || "") === String(right.citationId || "") &&
    String(left.referenceAnchorId || "") === String(right.referenceAnchorId || "")
  );
};

const collectRunsFromNode = (node, style, runs) => {
  if (!node) return;

  if (node.nodeType === Node.TEXT_NODE) {
    const normalized = String(node.nodeValue || "").replace(/\r/g, "").replace(/\u00a0/g, " ");
    if (!normalized) return;

    const lines = normalized.split("\n");
    for (let index = 0; index < lines.length; index += 1) {
      const chunk = lines[index];
      if (chunk) {
        runs.push({ ...cloneInlineStyle(style), text: chunk });
      }
      if (index < lines.length - 1) {
        runs.push({ break: true });
      }
    }
    return;
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return;

  const tagName = node.tagName.toLowerCase();
  if (node.classList.contains("citation-marker")) {
    const citationId = String(node.dataset.citeId || "").trim();
    const citationOrder = String(node.dataset.citeOrder || "").trim();
    const citationLabel = citationOrder || (node.textContent || "").trim();
    if (citationLabel) {
      runs.push({
        ...cloneInlineStyle(style),
        superscript: true,
        text: citationLabel,
        citationId
      });
    }
    return;
  }

  if (node.classList.contains("latex-token")) {
    const latexSource = (node.dataset.latex || node.textContent || "").trim();
    if (latexSource) {
      runs.push({ ...cloneInlineStyle(style), text: latexSource });
    }
    return;
  }

  if (tagName === "br") {
    runs.push({ break: true });
    return;
  }

  const nextStyle = INLINE_STYLE_TAGS.has(tagName) ? styleFromTag(tagName, style) : cloneInlineStyle(style);
  for (const child of node.childNodes) {
    collectRunsFromNode(child, nextStyle, runs);
  }
};

const normalizeRuns = (runs) => {
  const merged = [];

  for (const run of runs) {
    if (run && run.break) {
      if (merged.length === 0 || merged[merged.length - 1].break) continue;
      merged.push({ break: true });
      continue;
    }

    const text = String(run && run.text ? run.text : "");
    if (!text) continue;

    const normalized = {
      ...cloneInlineStyle(run),
      citationId: run.citationId ? String(run.citationId) : "",
      referenceAnchorId: run.referenceAnchorId ? String(run.referenceAnchorId) : "",
      text
    };

    const previous = merged[merged.length - 1];
    if (previous && !previous.break && runsHaveSameStyle(previous, normalized)) {
      previous.text += normalized.text;
      continue;
    }

    merged.push(normalized);
  }

  return merged;
};

const extractRunsFromElement = (element) => {
  const rawRuns = [];
  for (const node of element.childNodes) {
    collectRunsFromNode(node, BASE_INLINE_STYLE, rawRuns);
  }
  return normalizeRuns(rawRuns);
};

const runsToPlainText = (runs) => {
  return runs
    .map((run) => {
      if (run.break) return "\n";
      return run.text;
    })
    .join("");
};

const paragraphKindFromTag = (tagName) => {
  if (tagName === "h5") return "subtitle";
  if (tagName === "h2" || tagName === "h3" || tagName === "h4") return "heading";
  return "body";
};

const plainTextRuns = (text, options = {}) => {
  return normalizeRuns([
    {
      ...cloneInlineStyle(BASE_INLINE_STYLE),
      bold: options.bold === true,
      italic: options.italic === true,
      text: String(text || "")
    }
  ]);
};

const parseBlockNode = (node) => {
  if (!node) return null;

  if (node.nodeType === Node.TEXT_NODE) {
    const normalized = String(node.nodeValue || "").replace(/\s+/g, " ").trim();
    if (!normalized) return null;
    return {
      kind: "body",
      align: "left",
      runs: normalizeRuns([{ ...cloneInlineStyle(BASE_INLINE_STYLE), text: normalized }])
    };
  }

  if (node.nodeType !== Node.ELEMENT_NODE) return null;

  const tagName = node.tagName.toLowerCase();
  if (node.classList.contains("graph-block")) {
    const figureNumber = (node.querySelector(".graph-figure-number")?.textContent || "").trim();
    const captionText = (node.querySelector(".graph-caption-text")?.textContent || "").trim();
    const line = `${figureNumber} ${captionText}`.replace(/\s+/g, " ").trim();
    return {
      kind: "mediaFigure",
      mediaType: "graph",
      align: "center",
      caption: line || "Graph",
      widthPercent: 100,
      graphState: readGraphState(node)
    };
  }

  if (node.classList.contains("image-block")) {
    const figureNumber = (node.querySelector(".image-figure-number")?.textContent || "").trim();
    const captionText = (node.querySelector(".image-caption-text")?.textContent || "").trim();
    const line = `${figureNumber} ${captionText}`.replace(/\s+/g, " ").trim();
    const image = node.querySelector(".image-element");
    const wrap = normalizeImageWrap(node.dataset.imageWrap);
    const widthPercent = normalizeImageWidth(node.dataset.imageWidth, wrap);
    const src = image ? String(image.getAttribute("src") || "").trim() : "";
    const alt = image ? String(image.getAttribute("alt") || "").trim() : "";
    return {
      kind: "mediaFigure",
      mediaType: "image",
      align: normalizeParagraphAlignment(node.dataset.imageAlign || "center"),
      caption: line || "[Image]",
      widthPercent,
      imageSrc: src,
      imageAlt: alt
    };
  }

  if (node.classList.contains("page-break-block")) {
    return {
      kind: "pageBreak",
      runs: []
    };
  }

  if (tagName === "table" && !node.closest(".graph-block, .image-block")) {
    const tableState = readTableStateFromLiveDom(node);
    return {
      kind: "table",
      align: paragraphAlignmentFromNode(node),
      caption: String(tableState.caption || "").replace(/\s+/g, " ").trim(),
      rows: tableState.rows.map((row) => row.map((cell) => String(cell || "")))
    };
  }

  if (tagName === "br") {
    return { kind: "body", align: "left", runs: [] };
  }

  if (BLOCK_TAGS.has(tagName)) {
    return {
      kind: paragraphKindFromTag(tagName),
      align: paragraphAlignmentFromNode(node),
      runs: extractRunsFromElement(node)
    };
  }

  const inlineRuns = extractRunsFromElement(node);
  if (inlineRuns.length === 0) return null;
  return {
    kind: "body",
    align: paragraphAlignmentFromNode(node),
    runs: inlineRuns
  };
};

const buildDocumentModel = () => {
  const titleRuns = extractRunsFromElement(titleField);
  const titleText = runsToPlainText(titleRuns).trim();
  const titleAlign = paragraphAlignmentFromNode(titleField);
  const sourceRoot = cloneNormalizedEditorRoot() || editor;

  const bodyParagraphs = [];
  for (const child of sourceRoot.childNodes) {
    const paragraph = parseBlockNode(child);
    if (paragraph) bodyParagraphs.push(paragraph);
  }

  if (bodyParagraphs.length === 0) {
    bodyParagraphs.push({ kind: "body", align: "left", runs: [] });
  }

  const paragraphs = [];
  if (titleText) {
    paragraphs.push({ kind: "title", align: titleAlign, runs: titleRuns });
  }
  paragraphs.push(...bodyParagraphs);
  const referencesHeadingText = normalizeReferencesHeading(
    referencesHeading ? referencesHeading.textContent : getFeatureState("referencesHeading")
  );

  const paragraphHasVisibleText = (paragraph) => {
    if (!paragraph || paragraph.kind === "pageBreak") return false;
    if (paragraph.kind === "mediaFigure") return true;
    if (paragraph.kind === "table") return true;
    if (!Array.isArray(paragraph.runs)) return false;
    return paragraph.runs.some((run) => !run.break && String(run.text || "").trim().length > 0);
  };

  if (citations.length > 0) {
    const hasContentBeforeReferences = paragraphs.some((paragraph) => paragraphHasVisibleText(paragraph));
    const lastKind = paragraphs[paragraphs.length - 1]?.kind || "";
    if (hasContentBeforeReferences && lastKind !== "pageBreak") {
      paragraphs.push({ kind: "pageBreak", runs: [] });
    }

    paragraphs.push({
      kind: "heading",
      align: "left",
      runs: normalizeRuns([{ ...cloneInlineStyle(BASE_INLINE_STYLE), text: referencesHeadingText }])
    });
    citations.forEach((citation, index) => {
      paragraphs.push({
        kind: "body",
        align: "left",
        runs: normalizeRuns([
          {
            ...cloneInlineStyle(BASE_INLINE_STYLE),
            text: `[${index + 1}] `,
            referenceAnchorId: citation.id
          },
          {
            ...cloneInlineStyle(BASE_INLINE_STYLE),
            text: citationDisplayText(citation)
          }
        ])
      });
    });
  }

  return {
    titleText,
    paragraphs
  };
};

const EMU_PER_PT = 12700;

const clampFigureWidthPercent = (value, fallback = 100) => {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.max(22, Math.min(100, Math.round(numeric)));
};

const mediaCaptionParagraphFromMedia = (paragraph) => {
  const fallback = paragraph && paragraph.mediaType === "graph" ? "Graph" : "Image";
  const text = String((paragraph && paragraph.caption) || "")
    .replace(/\s+/g, " ")
    .trim();
  return {
    kind: "body",
    align: normalizeParagraphAlignment((paragraph && paragraph.align) || "center"),
    runs: normalizeRuns([{ ...cloneInlineStyle(BASE_INLINE_STYLE), text: text || fallback }])
  };
};

const decodeBase64DataUrl = (dataUrl) => {
  const match = String(dataUrl || "").match(/^data:([^;,]+)?;base64,([a-z0-9+/=\s]+)$/i);
  if (!match) return null;
  const mime = (match[1] || "application/octet-stream").toLowerCase();
  const base64 = String(match[2] || "").replace(/\s+/g, "");
  if (!base64) return null;

  let binary = "";
  try {
    binary = atob(base64);
  } catch {
    return null;
  }
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) {
    bytes[index] = binary.charCodeAt(index);
  }
  return { mime, bytes };
};

const bytesToPdfHex = (bytes) => {
  if (!(bytes instanceof Uint8Array) || bytes.length === 0) return "";
  const table = "0123456789ABCDEF";
  let output = "";
  for (let index = 0; index < bytes.length; index += 1) {
    const value = bytes[index];
    output += table[(value >> 4) & 0xf] + table[value & 0xf];
  }
  return output;
};

const loadImageFromSource = (src) => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.decoding = "async";
    if (/^https?:\/\//i.test(src)) {
      image.crossOrigin = "anonymous";
    }
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("Could not load image source."));
    image.src = src;
  });
};

const rasterizeImageSourceToJpegBytes = async (src, options = {}) => {
  const source = String(src || "").trim();
  if (!source) return null;

  const maxWidth = Math.max(64, Number(options.maxWidth) || 1800);
  const maxHeight = Math.max(64, Number(options.maxHeight) || 1800);
  const quality = Number.isFinite(Number(options.quality)) ? Math.max(0.5, Math.min(1, Number(options.quality))) : 0.9;

  let image;
  try {
    image = await loadImageFromSource(source);
  } catch {
    return null;
  }

  const sourceWidth = Math.max(1, Math.round(image.naturalWidth || image.width || 1));
  const sourceHeight = Math.max(1, Math.round(image.naturalHeight || image.height || 1));
  const scale = Math.min(1, maxWidth / sourceWidth, maxHeight / sourceHeight);
  const widthPx = Math.max(1, Math.round(sourceWidth * scale));
  const heightPx = Math.max(1, Math.round(sourceHeight * scale));

  const canvas = document.createElement("canvas");
  canvas.width = widthPx;
  canvas.height = heightPx;
  const context = canvas.getContext("2d", { alpha: false });
  if (!context) return null;

  context.fillStyle = "#ffffff";
  context.fillRect(0, 0, widthPx, heightPx);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(image, 0, 0, widthPx, heightPx);

  let dataUrl = "";
  try {
    dataUrl = canvas.toDataURL("image/jpeg", quality);
  } catch {
    return null;
  }

  const decoded = decodeBase64DataUrl(dataUrl);
  if (!decoded || decoded.bytes.length === 0) return null;
  return {
    mime: "image/jpeg",
    bytes: decoded.bytes,
    widthPx,
    heightPx
  };
};

const renderGraphStateToJpegBytes = async (rawState) => {
  const engine = graphEngine();
  if (!engine || typeof engine.render !== "function") return null;

  const state = normalizeGraphState(rawState);
  const width = 1240;
  const height = state.series.length > 1 ? 700 : 640;
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
  svg.setAttribute("width", String(width));
  svg.setAttribute("height", String(height));
  svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
  engine.render(svg, state, { width, height });

  const xml = new XMLSerializer().serializeToString(svg);
  const blob = new Blob([xml], { type: "image/svg+xml;charset=utf-8" });
  const blobUrl = URL.createObjectURL(blob);
  try {
    return await rasterizeImageSourceToJpegBytes(blobUrl, {
      maxWidth: width,
      maxHeight: height,
      quality: 0.9
    });
  } finally {
    URL.revokeObjectURL(blobUrl);
  }
};

const mediaAssetCacheKey = (paragraph) => {
  if (!paragraph || paragraph.kind !== "mediaFigure") return "";
  if (paragraph.mediaType === "image") {
    return `image:${String(paragraph.imageSrc || "").trim()}`;
  }
  if (paragraph.mediaType === "graph") {
    try {
      return `graph:${JSON.stringify(normalizeGraphState(paragraph.graphState))}`;
    } catch {
      return "";
    }
  }
  return "";
};

const resolveMediaAssetForParagraph = async (paragraph, cache = null) => {
  if (!paragraph || paragraph.kind !== "mediaFigure") return null;

  const compute = async () => {
    if (paragraph.mediaType === "image") {
      return rasterizeImageSourceToJpegBytes(paragraph.imageSrc);
    }
    if (paragraph.mediaType === "graph") {
      return renderGraphStateToJpegBytes(paragraph.graphState);
    }
    return null;
  };

  if (!(cache instanceof Map)) {
    return compute();
  }

  const key = mediaAssetCacheKey(paragraph);
  if (!key) {
    return compute();
  }
  if (!cache.has(key)) {
    cache.set(key, compute());
  }

  let result = null;
  try {
    result = await cache.get(key);
  } catch {
    cache.delete(key);
    return null;
  }

  if (!result) {
    cache.delete(key);
    return null;
  }
  return result;
};

const computeMediaRenderSizePt = (asset, maxWidthPt, maxHeightPt, widthPercent = 100) => {
  const safeMaxWidth = Math.max(72, Number(maxWidthPt) || 72);
  const safeMaxHeight = Math.max(72, Number(maxHeightPt) || 72);
  const ratio =
    Number(asset && asset.widthPx) > 0 && Number(asset && asset.heightPx) > 0
      ? Math.max(0.1, Number(asset.heightPx) / Number(asset.widthPx))
      : 0.66;

  const preferredWidth = safeMaxWidth * (clampFigureWidthPercent(widthPercent, 100) / 100);
  let widthPt = Math.max(Math.min(96, safeMaxWidth), preferredWidth);
  let heightPt = widthPt * ratio;

  if (heightPt > safeMaxHeight) {
    const scale = safeMaxHeight / heightPt;
    widthPt *= scale;
    heightPt *= scale;
  }
  if (widthPt > safeMaxWidth) {
    const scale = safeMaxWidth / widthPt;
    widthPt *= scale;
    heightPt *= scale;
  }

  return {
    widthPt: Math.max(48, widthPt),
    heightPt: Math.max(48, heightPt)
  };
};

const escapeXml = (text) => {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
};

const sanitizeXmlText = (text) => {
  return String(text).replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "");
};

const escapeXmlText = (text) => {
  return escapeXml(sanitizeXmlText(text));
};

const docxSizeForKind = (kind) => {
  if (kind === "title") return 72;
  if (kind === "heading") return 40;
  if (kind === "subtitle") return 32;
  return 24;
};

const docxAlignValue = (align) => {
  const normalized = normalizeParagraphAlignment(align);
  if (normalized === "center") return "center";
  if (normalized === "right") return "right";
  if (normalized === "justify") return "both";
  return "left";
};

const docxParagraphProperties = (kind, align = "left") => {
  const jc = `<w:jc w:val="${docxAlignValue(align)}"/>`;
  if (kind === "pageBreak") {
    return `<w:pPr>${jc}<w:spacing w:after="0"/><w:ind w:firstLine="0"/></w:pPr>`;
  }
  if (kind === "title") {
    return `<w:pPr>${jc}<w:spacing w:after="320"/><w:ind w:firstLine="0"/></w:pPr>`;
  }
  if (kind === "heading") {
    return `<w:pPr>${jc}<w:spacing w:after="180"/><w:ind w:firstLine="0"/></w:pPr>`;
  }
  if (kind === "subtitle") {
    return `<w:pPr>${jc}<w:spacing w:after="160"/><w:ind w:firstLine="0"/></w:pPr>`;
  }
  return `<w:pPr>${jc}<w:spacing w:after="120"/><w:ind w:firstLine="0"/></w:pPr>`;
};

const buildDocxRunProperties = (run, kind) => {
  const size = docxSizeForKind(kind);
  const props = [
    '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>',
    `<w:sz w:val="${size}"/>`,
    `<w:szCs w:val="${size}"/>`,
    '<w:color w:val="000000"/>'
  ];

  if (kind === "title" || kind === "heading" || run.bold) props.push("<w:b/>");
  if (kind === "subtitle" || run.italic) props.push("<w:i/>");
  if (run.underline) props.push('<w:u w:val="single"/>');
  if (run.strike) props.push("<w:strike/>");
  if (run.superscript) props.push('<w:vertAlign w:val="superscript"/>');
  if (run.subscript) props.push('<w:vertAlign w:val="subscript"/>');

  return `<w:rPr>${props.join("")}</w:rPr>`;
};

const buildDocxRunsXml = (runs, kind) => {
  const xmlRuns = [];

  for (const run of runs) {
    if (run.break) {
      xmlRuns.push("<w:r><w:br/></w:r>");
      continue;
    }

    const text = sanitizeXmlText(run.text || "");
    if (!text) continue;
    xmlRuns.push(
      `<w:r>${buildDocxRunProperties(run, kind)}<w:t xml:space="preserve">${escapeXmlText(text)}</w:t></w:r>`
    );
  }

  if (xmlRuns.length === 0) {
    xmlRuns.push(
      `<w:r>${buildDocxRunProperties(BASE_INLINE_STYLE, kind)}<w:t xml:space="preserve"> </w:t></w:r>`
    );
  }

  return xmlRuns.join("");
};

const buildDocxParagraphXml = (paragraph) => {
  if (paragraph.kind === "pageBreak") {
    return `<w:p>${docxParagraphProperties("pageBreak", paragraph.align)}<w:r><w:br w:type="page"/></w:r></w:p>`;
  }
  return `<w:p>${docxParagraphProperties(paragraph.kind, paragraph.align)}${buildDocxRunsXml(paragraph.runs, paragraph.kind)}</w:p>`;
};

const buildDocxTableCellParagraphXml = (text, options = {}) => {
  const runs = plainTextRuns(text, { bold: options.header === true });
  return `<w:p>${docxParagraphProperties("body", "left")}${buildDocxRunsXml(runs, "body")}</w:p>`;
};

const buildDocxTableXml = (paragraph, docxLayout) => {
  const rows = Array.isArray(paragraph && paragraph.rows) ? paragraph.rows.filter((row) => Array.isArray(row)) : [];
  if (rows.length === 0) return "";

  const layout = normalizeDocxLayout(docxLayout);
  const columnCount = Math.max(1, rows.reduce((max, row) => Math.max(max, row.length), 0));
  const tableWidthTwips = Math.max(1440, layout.widthTwips - layout.marginLeftTwips - layout.marginRightTwips);
  const columnWidthTwips = Math.max(720, Math.floor(tableWidthTwips / columnCount));
  const normalizedRows = rows.map((row) => {
    const output = row.slice(0, columnCount).map((cell) => String(cell == null ? "" : cell));
    while (output.length < columnCount) {
      output.push("");
    }
    return output;
  });

  const tableRowsXml = normalizedRows
    .map((row, rowIndex) => {
      const isHeader = rowIndex === 0;
      const cellsXml = row
        .map((cellText) => {
          const shading = isHeader ? '<w:shd w:val="clear" w:color="auto" w:fill="E0E0E0"/>' : "";
          return (
            `<w:tc><w:tcPr><w:tcW w:w="${columnWidthTwips}" w:type="dxa"/>${shading}</w:tcPr>` +
            `${buildDocxTableCellParagraphXml(cellText, { header: isHeader })}</w:tc>`
          );
        })
        .join("");
      return `<w:tr>${cellsXml}</w:tr>`;
    })
    .join("");

  return (
    `<w:tbl><w:tblPr><w:tblW w:w="${tableWidthTwips}" w:type="dxa"/>` +
    '<w:tblBorders><w:top w:val="single" w:sz="8" w:space="0" w:color="000000"/><w:left w:val="single" w:sz="4" w:space="0" w:color="000000"/>' +
    '<w:bottom w:val="single" w:sz="8" w:space="0" w:color="000000"/><w:right w:val="single" w:sz="4" w:space="0" w:color="000000"/>' +
    '<w:insideH w:val="single" w:sz="4" w:space="0" w:color="000000"/><w:insideV w:val="single" w:sz="4" w:space="0" w:color="000000"/></w:tblBorders>' +
    "</w:tblPr><w:tblGrid>" +
    Array.from({ length: columnCount }, () => `<w:gridCol w:w="${columnWidthTwips}"/>`).join("") +
    `</w:tblGrid>${tableRowsXml}</w:tbl>`
  );
};

const normalizeDocxLayout = (docxLayout) => {
  if (docxLayout && typeof docxLayout === "object") {
    const widthTwips = Number(docxLayout.widthTwips);
    const heightTwips = Number(docxLayout.heightTwips);
    return {
      widthTwips: Number.isFinite(widthTwips) && widthTwips > 0 ? Math.round(widthTwips) : 12240,
      heightTwips: Number.isFinite(heightTwips) && heightTwips > 0 ? Math.round(heightTwips) : 15840,
      marginTopTwips: Math.max(0, Number(docxLayout.marginTopTwips) || 0),
      marginRightTwips: Math.max(0, Number(docxLayout.marginRightTwips) || 0),
      marginBottomTwips: Math.max(0, Number(docxLayout.marginBottomTwips) || 0),
      marginLeftTwips: Math.max(0, Number(docxLayout.marginLeftTwips) || 0)
    };
  }
  return {
    widthTwips: 12240,
    heightTwips: 15840,
    marginTopTwips: 1440,
    marginRightTwips: 1440,
    marginBottomTwips: 1440,
    marginLeftTwips: 1440
  };
};

const buildDocxMediaDrawingXml = (mediaEntry, paragraph) => {
  if (!mediaEntry || !paragraph) return "";
  const align = normalizeParagraphAlignment(paragraph.align || "center");
  const name = paragraph.mediaType === "graph" ? `Graph ${mediaEntry.drawingId}` : paragraph.imageAlt || `Image ${mediaEntry.drawingId}`;
  const escapedName = escapeXmlText(name);
  const cx = Math.max(1, Math.round(mediaEntry.cx));
  const cy = Math.max(1, Math.round(mediaEntry.cy));

  return [
    "<w:p>",
    docxParagraphProperties("body", align),
    "<w:r>",
    "<w:drawing>",
    '<wp:inline distT="0" distB="0" distL="0" distR="0">',
    `<wp:extent cx="${cx}" cy="${cy}"/>`,
    '<wp:effectExtent l="0" t="0" r="0" b="0"/>',
    `<wp:docPr id="${mediaEntry.drawingId}" name="${escapedName}" descr="${escapedName}"/>`,
    '<wp:cNvGraphicFramePr><a:graphicFrameLocks noChangeAspect="1"/></wp:cNvGraphicFramePr>',
    "<a:graphic>",
    '<a:graphicData uri="http://schemas.openxmlformats.org/drawingml/2006/picture">',
    "<pic:pic>",
    "<pic:nvPicPr>",
    `<pic:cNvPr id="${mediaEntry.drawingId}" name="${escapeXmlText(mediaEntry.fileName)}"/>`,
    "<pic:cNvPicPr/>",
    "</pic:nvPicPr>",
    "<pic:blipFill>",
    `<a:blip r:embed="${mediaEntry.relId}"/>`,
    "<a:stretch><a:fillRect/></a:stretch>",
    "</pic:blipFill>",
    "<pic:spPr>",
    `<a:xfrm><a:off x="0" y="0"/><a:ext cx="${cx}" cy="${cy}"/></a:xfrm>`,
    '<a:prstGeom prst="rect"><a:avLst/></a:prstGeom>',
    "</pic:spPr>",
    "</pic:pic>",
    "</a:graphicData>",
    "</a:graphic>",
    "</wp:inline>",
    "</w:drawing>",
    "</w:r>",
    "</w:p>"
  ].join("");
};

const prepareDocxMediaContext = async (model, docxLayout) => {
  const layout = normalizeDocxLayout(docxLayout);
  const innerWidthPt = Math.max(120, (layout.widthTwips - layout.marginLeftTwips - layout.marginRightTwips) / 20);
  const innerHeightPt = Math.max(140, (layout.heightTwips - layout.marginTopTwips - layout.marginBottomTwips) / 20);
  const maxMediaHeightPt = Math.max(120, innerHeightPt * 0.62);
  const cache = new Map();

  const entries = [];
  let relCounter = 2;
  let imageCounter = 1;
  let drawingCounter = 1;

  for (let index = 0; index < model.paragraphs.length; index += 1) {
    const paragraph = model.paragraphs[index];
    if (!paragraph || paragraph.kind !== "mediaFigure") continue;

    const asset = await resolveMediaAssetForParagraph(paragraph, cache);
    if (!asset || !(asset.bytes instanceof Uint8Array) || asset.bytes.length === 0) continue;

    const size = computeMediaRenderSizePt(asset, innerWidthPt, maxMediaHeightPt, paragraph.widthPercent);
    entries.push({
      paragraphIndex: index,
      relId: `rId${relCounter++}`,
      fileName: `image${imageCounter++}.jpg`,
      bytes: asset.bytes,
      drawingId: drawingCounter++,
      cx: Math.round(size.widthPt * EMU_PER_PT),
      cy: Math.round(size.heightPt * EMU_PER_PT)
    });
  }

  return { layout, entries };
};

const buildDocxDocumentXml = (model, docxLayout, mediaContext = null) => {
  const layout = normalizeDocxLayout(docxLayout);
  const mediaEntries = mediaContext && Array.isArray(mediaContext.entries) ? mediaContext.entries : [];
  const mediaByParagraphIndex = new Map(mediaEntries.map((entry) => [entry.paragraphIndex, entry]));
  const paragraphXmlParts = [];

  model.paragraphs.forEach((paragraph, index) => {
    if (paragraph.kind === "mediaFigure") {
      const mediaEntry = mediaByParagraphIndex.get(index);
      if (mediaEntry) {
        paragraphXmlParts.push(buildDocxMediaDrawingXml(mediaEntry, paragraph));
      }
      paragraphXmlParts.push(buildDocxParagraphXml(mediaCaptionParagraphFromMedia(paragraph)));
      return;
    }
    if (paragraph.kind === "table") {
      const captionText = String(paragraph.caption || "").trim();
      if (captionText) {
        paragraphXmlParts.push(
          buildDocxParagraphXml({
            kind: "body",
            align: "center",
            runs: plainTextRuns(captionText)
          })
        );
      }
      paragraphXmlParts.push(buildDocxTableXml(paragraph, layout));
      return;
    }
    paragraphXmlParts.push(buildDocxParagraphXml(paragraph));
  });

  const paragraphsXml = paragraphXmlParts.join("");
  const headerTwips = Math.max(0, Math.round(layout.marginTopTwips / 2));
  const footerTwips = Math.max(0, Math.round(layout.marginBottomTwips / 2));

  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main" xmlns:r="http://schemas.openxmlformats.org/officeDocument/2006/relationships" xmlns:wp="http://schemas.openxmlformats.org/drawingml/2006/wordprocessingDrawing" xmlns:a="http://schemas.openxmlformats.org/drawingml/2006/main" xmlns:pic="http://schemas.openxmlformats.org/drawingml/2006/picture">',
    "<w:body>",
    paragraphsXml,
    `<w:sectPr><w:pgSz w:w="${layout.widthTwips}" w:h="${layout.heightTwips}"/><w:pgMar w:top="${layout.marginTopTwips}" w:right="${layout.marginRightTwips}" w:bottom="${layout.marginBottomTwips}" w:left="${layout.marginLeftTwips}" w:header="${headerTwips}" w:footer="${footerTwips}" w:gutter="0"/></w:sectPr>`,
    "</w:body>",
    "</w:document>"
  ].join("");
};

const buildDocxStylesXml = () => {
  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<w:styles xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">',
    "<w:docDefaults>",
    "<w:rPrDefault>",
    "<w:rPr>",
    '<w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman" w:cs="Times New Roman"/>',
    '<w:color w:val="000000"/>',
    '<w:sz w:val="24"/>',
    '<w:szCs w:val="24"/>',
    "</w:rPr>",
    "</w:rPrDefault>",
    "</w:docDefaults>",
    "</w:styles>"
  ].join("");
};

const buildDocxCoreXml = (model) => {
  const nowIso = new Date().toISOString();
  const title = model.titleText || exportBaseName();

  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<cp:coreProperties xmlns:cp="http://schemas.openxmlformats.org/package/2006/metadata/core-properties" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:dcterms="http://purl.org/dc/terms/" xmlns:dcmitype="http://purl.org/dc/dcmitype/" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">',
    "<dc:creator>Minimal Editor</dc:creator>",
    "<cp:lastModifiedBy>Minimal Editor</cp:lastModifiedBy>",
    `<dc:title>${escapeXmlText(title)}</dc:title>`,
    `<dcterms:created xsi:type="dcterms:W3CDTF">${escapeXmlText(nowIso)}</dcterms:created>`,
    `<dcterms:modified xsi:type="dcterms:W3CDTF">${escapeXmlText(nowIso)}</dcterms:modified>`,
    "</cp:coreProperties>"
  ].join("");
};

const buildDocxAppXml = () => {
  return [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<Properties xmlns="http://schemas.openxmlformats.org/officeDocument/2006/extended-properties" xmlns:vt="http://schemas.openxmlformats.org/officeDocument/2006/docPropsVTypes">',
    "<Application>Minimal Editor</Application>",
    "</Properties>"
  ].join("");
};

const buildDocxFiles = (model, docxLayout, mediaContext = null) => {
  const mediaEntries = mediaContext && Array.isArray(mediaContext.entries) ? mediaContext.entries : [];
  const hasMedia = mediaEntries.length > 0;
  const documentRels = [
    '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
    '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
    '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/>',
    ...mediaEntries.map(
      (entry) =>
        `<Relationship Id="${entry.relId}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/image" Target="media/${entry.fileName}"/>`
    ),
    "</Relationships>"
  ].join("");

  const files = [
    {
      name: "[Content_Types].xml",
      data: [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">',
        '<Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>',
        '<Default Extension="xml" ContentType="application/xml"/>',
        ...(hasMedia ? ['<Default Extension="jpg" ContentType="image/jpeg"/>'] : []),
        '<Override PartName="/docProps/core.xml" ContentType="application/vnd.openxmlformats-package.core-properties+xml"/>',
        '<Override PartName="/docProps/app.xml" ContentType="application/vnd.openxmlformats-officedocument.extended-properties+xml"/>',
        '<Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>',
        '<Override PartName="/word/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.styles+xml"/>',
        "</Types>"
      ].join("")
    },
    {
      name: "_rels/.rels",
      data: [
        '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>',
        '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">',
        '<Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>',
        '<Relationship Id="rId2" Type="http://schemas.openxmlformats.org/package/2006/relationships/metadata/core-properties" Target="docProps/core.xml"/>',
        '<Relationship Id="rId3" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/extended-properties" Target="docProps/app.xml"/>',
        "</Relationships>"
      ].join("")
    },
    {
      name: "docProps/core.xml",
      data: buildDocxCoreXml(model)
    },
    {
      name: "docProps/app.xml",
      data: buildDocxAppXml()
    },
    {
      name: "word/document.xml",
      data: buildDocxDocumentXml(model, docxLayout, mediaContext)
    },
    {
      name: "word/styles.xml",
      data: buildDocxStylesXml()
    },
    {
      name: "word/_rels/document.xml.rels",
      data: documentRels
    }
  ];

  mediaEntries.forEach((entry) => {
    files.push({
      name: `word/media/${entry.fileName}`,
      data: entry.bytes
    });
  });

  return files;
};

const toBytes = (value) => {
  return value instanceof Uint8Array ? value : textEncoder.encode(value);
};

const CRC32_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let index = 0; index < 256; index += 1) {
    let crc = index;
    for (let bit = 0; bit < 8; bit += 1) {
      crc = (crc & 1) !== 0 ? 0xedb88320 ^ (crc >>> 1) : crc >>> 1;
    }
    table[index] = crc >>> 0;
  }
  return table;
})();

const crc32 = (bytes) => {
  let crc = 0xffffffff;
  for (let index = 0; index < bytes.length; index += 1) {
    crc = CRC32_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
};

const createZipBlob = (entries, mimeType) => {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    const nameBytes = toBytes(entry.name);
    const dataBytes = toBytes(entry.data);
    const crc = crc32(dataBytes);

    const localHeader = new Uint8Array(30 + nameBytes.length);
    const localView = new DataView(localHeader.buffer);
    localView.setUint32(0, 0x04034b50, true);
    localView.setUint16(4, 20, true);
    localView.setUint16(6, 0, true);
    localView.setUint16(8, 0, true);
    localView.setUint16(10, 0, true);
    localView.setUint16(12, 0, true);
    localView.setUint32(14, crc, true);
    localView.setUint32(18, dataBytes.length, true);
    localView.setUint32(22, dataBytes.length, true);
    localView.setUint16(26, nameBytes.length, true);
    localView.setUint16(28, 0, true);
    localHeader.set(nameBytes, 30);

    localParts.push(localHeader, dataBytes);

    const centralHeader = new Uint8Array(46 + nameBytes.length);
    const centralView = new DataView(centralHeader.buffer);
    centralView.setUint32(0, 0x02014b50, true);
    centralView.setUint16(4, 20, true);
    centralView.setUint16(6, 20, true);
    centralView.setUint16(8, 0, true);
    centralView.setUint16(10, 0, true);
    centralView.setUint16(12, 0, true);
    centralView.setUint16(14, 0, true);
    centralView.setUint32(16, crc, true);
    centralView.setUint32(20, dataBytes.length, true);
    centralView.setUint32(24, dataBytes.length, true);
    centralView.setUint16(28, nameBytes.length, true);
    centralView.setUint16(30, 0, true);
    centralView.setUint16(32, 0, true);
    centralView.setUint16(34, 0, true);
    centralView.setUint16(36, 0, true);
    centralView.setUint32(38, 0, true);
    centralView.setUint32(42, offset, true);
    centralHeader.set(nameBytes, 46);

    centralParts.push(centralHeader);
    offset += localHeader.length + dataBytes.length;
  }

  const centralSize = centralParts.reduce((total, chunk) => total + chunk.length, 0);
  const endRecord = new Uint8Array(22);
  const endView = new DataView(endRecord.buffer);
  endView.setUint32(0, 0x06054b50, true);
  endView.setUint16(4, 0, true);
  endView.setUint16(6, 0, true);
  endView.setUint16(8, entries.length, true);
  endView.setUint16(10, entries.length, true);
  endView.setUint32(12, centralSize, true);
  endView.setUint32(16, offset, true);
  endView.setUint16(20, 0, true);

  return new Blob([...localParts, ...centralParts, endRecord], { type: mimeType });
};

const buildDocxBlobFromModel = async (model, docxLayout) => {
  const mediaContext = await prepareDocxMediaContext(model, docxLayout);
  return createZipBlob(buildDocxFiles(model, mediaContext.layout, mediaContext), DOCX_MIME);
};

const paragraphMetricsForKind = (kind, align = "left") => {
  if (kind === "title") {
    return {
      fontSize: 36,
      lineHeight: 44,
      afterSpacing: 20,
      firstLineIndent: 0
    };
  }

  if (kind === "heading") {
    return {
      fontSize: 20,
      lineHeight: 30,
      afterSpacing: 8,
      firstLineIndent: 0
    };
  }

  if (kind === "subtitle") {
    return {
      fontSize: 16,
      lineHeight: 24,
      afterSpacing: 8,
      firstLineIndent: 0
    };
  }

  return {
    fontSize: 12,
    lineHeight: 18,
    afterSpacing: 4,
    firstLineIndent: 0
  };
};

const styleForPdfRun = (run, kind) => {
  const metrics = paragraphMetricsForKind(kind);
  const isSuper = Boolean(run.superscript);
  const isSub = Boolean(run.subscript);
  const baseSize = metrics.fontSize;
  const adjustedSize = isSuper || isSub ? Math.max(8, baseSize * 0.68) : baseSize;

  return {
    bold: kind === "title" || kind === "heading" || Boolean(run.bold),
    italic: kind === "subtitle" || Boolean(run.italic),
    underline: Boolean(run.underline),
    strike: Boolean(run.strike),
    superscript: isSuper,
    subscript: isSub,
    rise: isSuper ? baseSize * 0.33 : isSub ? -baseSize * 0.2 : 0,
    fontSize: adjustedSize
  };
};

const pdfStyleEquals = (left, right) => {
  return (
    left.bold === right.bold &&
    left.italic === right.italic &&
    left.underline === right.underline &&
    left.strike === right.strike &&
    left.fontSize === right.fontSize &&
    left.rise === right.rise
  );
};

const pdfFontKeyFromStyle = (style) => {
  if (style.bold && style.italic) return "F4";
  if (style.bold) return "F2";
  if (style.italic) return "F3";
  return "F1";
};

const canvasFontFromStyle = (style) => {
  const parts = [];
  if (style.italic) parts.push("italic");
  if (style.bold) parts.push("700");
  parts.push(`${style.fontSize}pt`);
  parts.push('"Times New Roman"');
  return parts.join(" ");
};

const measureTextPt = (text, style) => {
  if (!text) return 0;
  if (!textMeasureContext) return text.length * style.fontSize * 0.5;
  textMeasureContext.font = canvasFontFromStyle(style);
  return textMeasureContext.measureText(text).width * PX_TO_PT;
};

const tokenizeTextForLayout = (text) => {
  const chunks = String(text || "").replace(/\r/g, "").split(/(\n|[ \t]+)/);
  const tokens = [];

  for (const chunk of chunks) {
    if (!chunk) continue;
    if (chunk === "\n") {
      tokens.push({ type: "break" });
      continue;
    }
    if (/^[ \t]+$/.test(chunk)) {
      tokens.push({ type: "space", text: " " });
      continue;
    }
    tokens.push({ type: "word", text: chunk });
  }

  return tokens;
};

const buildParagraphLayout = (paragraph, pdfLayout) => {
  const metrics = paragraphMetricsForKind(paragraph.kind, paragraph.align);
  const lines = [];

  let firstLine = true;
  let lineSegments = [];
  let lineWidth = 0;

  const maxLineWidth = () => {
    return pdfLayout.innerWidth - (firstLine ? metrics.firstLineIndent : 0);
  };

  const flushLine = (allowBlankLine) => {
    while (lineSegments.length > 0 && lineSegments[lineSegments.length - 1].isSpace) {
      const dropped = lineSegments.pop();
      lineWidth -= dropped.width;
    }

    if (lineSegments.length === 0) {
      if (!allowBlankLine) return;
      lines.push({ segments: [], firstLine });
      firstLine = false;
      return;
    }

    lines.push({ segments: lineSegments, firstLine });
    lineSegments = [];
    lineWidth = 0;
    firstLine = false;
  };

  for (const run of paragraph.runs) {
    if (run.break) {
      flushLine(true);
      continue;
    }

    const style = styleForPdfRun(run, paragraph.kind);
    const tokens = tokenizeTextForLayout(run.text);

    for (const token of tokens) {
      if (token.type === "break") {
        flushLine(true);
        continue;
      }

      if (token.type === "space" && lineSegments.length === 0) {
        continue;
      }

      const tokenText = token.text;
      const tokenWidth = measureTextPt(tokenText, style);
      const widthLimit = maxLineWidth();

      if (token.type === "word" && lineSegments.length > 0 && lineWidth + tokenWidth > widthLimit) {
        flushLine(false);
      }

      if (token.type === "space" && lineSegments.length === 0) {
        continue;
      }

      const segment = {
        text: tokenText,
        width: tokenWidth,
        isSpace: token.type === "space",
        style,
        citationId: run.citationId ? String(run.citationId) : "",
        referenceAnchorId: run.referenceAnchorId ? String(run.referenceAnchorId) : ""
      };

      const previous = lineSegments[lineSegments.length - 1];
      if (
        previous &&
        !previous.isSpace &&
        !segment.isSpace &&
        pdfStyleEquals(previous.style, segment.style) &&
        String(previous.citationId || "") === String(segment.citationId || "") &&
        String(previous.referenceAnchorId || "") === String(segment.referenceAnchorId || "")
      ) {
        previous.text += segment.text;
        previous.width += segment.width;
      } else {
        lineSegments.push(segment);
      }
      lineWidth += tokenWidth;
    }
  }

  flushLine(false);

  if (lines.length === 0) {
    lines.push({ segments: [], firstLine: true });
  }

  return {
    lines,
    metrics
  };
};

const formatPdfNumber = (value) => {
  const text = Number(value).toFixed(2);
  return text.replace(/\.?0+$/, "");
};

const sanitizePdfText = (text) => {
  return String(text || "")
    .replace(/\r/g, "")
    .replace(/[^\x20-\x7E]/g, "?");
};

const escapePdfString = (text) => {
  return sanitizePdfText(text).replace(/\\/g, "\\\\").replace(/\(/g, "\\(").replace(/\)/g, "\\)");
};

const renderModelToPdfStreams = async (model, pdfLayout) => {
  const pages = [[]];
  let pageIndex = 0;
  let cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
  const citationLinks = [];
  const referenceTargets = new Map();
  const pageImages = new Map();
  let nextImageResourceId = 1;
  const mediaAssetCache = new Map();

  const currentPage = () => pages[pageIndex];
  const pushCommand = (command) => {
    currentPage().push(command);
  };

  const ensurePageSpace = (requiredHeight) => {
    if (cursorY - requiredHeight >= pdfLayout.marginBottom) return;
    pages.push([]);
    pageIndex += 1;
    cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
  };

  const renderStyledLine = ({ line, align = "left", lineX, lineY, widthLimit, allowJustify = true }) => {
    const rawLineWidth = line.segments.reduce((total, segment) => total + segment.width, 0);
    const spaceCount = line.segments.reduce((total, segment) => total + (segment.isSpace ? 1 : 0), 0);
    const shouldJustify =
      allowJustify && align === "justify" && !line.isLastLine && spaceCount > 0 && rawLineWidth < widthLimit;
    const justifySpaceDelta = shouldJustify ? (widthLimit - rawLineWidth) / spaceCount : 0;

    let drawLineX = lineX;
    if (!shouldJustify) {
      if (align === "center") {
        drawLineX += Math.max(0, (widthLimit - rawLineWidth) / 2);
      } else if (align === "right") {
        drawLineX += Math.max(0, widthLimit - rawLineWidth);
      }
    }

    let penX = drawLineX;
    const textCommands = ["BT", `1 0 0 1 ${formatPdfNumber(drawLineX)} ${formatPdfNumber(lineY)} Tm`];
    if (shouldJustify && justifySpaceDelta > 0) {
      textCommands.push(`${formatPdfNumber(justifySpaceDelta)} Tw`);
    }
    const drawCommands = [];
    let currentFont = "";
    let currentFontSize = -1;
    let currentRise = 0;

    for (const segment of line.segments) {
      if (!segment.text) continue;

      const fontKey = pdfFontKeyFromStyle(segment.style);
      const fontSize = segment.style.fontSize;
      const rise = segment.style.rise;

      if (fontKey !== currentFont || fontSize !== currentFontSize) {
        textCommands.push(`/${fontKey} ${formatPdfNumber(fontSize)} Tf`);
        currentFont = fontKey;
        currentFontSize = fontSize;
      }

      if (rise !== currentRise) {
        textCommands.push(`${formatPdfNumber(rise)} Ts`);
        currentRise = rise;
      }

      textCommands.push(`(${escapePdfString(segment.text)}) Tj`);

      const segmentWidth = segment.width + (shouldJustify && segment.isSpace ? justifySpaceDelta : 0);
      const nextPenX = penX + segmentWidth;
      const rectTop = lineY + fontSize * 0.82 + rise;
      const rectBottom = lineY - fontSize * 0.36 + rise;

      if (segment.citationId) {
        citationLinks.push({
          citationId: segment.citationId,
          pageIndex,
          rect: {
            x1: Math.min(penX, nextPenX),
            y1: Math.min(rectBottom, rectTop),
            x2: Math.max(penX, nextPenX),
            y2: Math.max(rectBottom, rectTop)
          }
        });
      }

      if (segment.referenceAnchorId && !referenceTargets.has(segment.referenceAnchorId) && !segment.isSpace) {
        referenceTargets.set(segment.referenceAnchorId, {
          pageIndex,
          x: penX,
          y: lineY + fontSize
        });
      }

      if (segment.style.underline) {
        const underlineY = lineY - 1 + rise;
        drawCommands.push(
          `${formatPdfNumber(penX)} ${formatPdfNumber(underlineY)} m ${formatPdfNumber(nextPenX)} ${formatPdfNumber(underlineY)} l S`
        );
      }
      if (segment.style.strike) {
        const strikeY = lineY + fontSize * 0.3 + rise;
        drawCommands.push(
          `${formatPdfNumber(penX)} ${formatPdfNumber(strikeY)} m ${formatPdfNumber(nextPenX)} ${formatPdfNumber(strikeY)} l S`
        );
      }

      penX = nextPenX;
    }

    if (currentRise !== 0) {
      textCommands.push("0 Ts");
    }
    if (shouldJustify && justifySpaceDelta > 0) {
      textCommands.push("0 Tw");
    }
    textCommands.push("ET");
    pushCommand(`${textCommands.join("\n")}\n`);

    if (drawCommands.length > 0) {
      pushCommand(`0 G\n0.5 w\n${drawCommands.join("\n")}\n`);
    }
  };

  const renderTextParagraph = (paragraph) => {
    const layout = buildParagraphLayout(paragraph, pdfLayout);
    const paragraphAlign = normalizeParagraphAlignment(paragraph.align);

    for (let lineIndex = 0; lineIndex < layout.lines.length; lineIndex += 1) {
      const line = layout.lines[lineIndex];
      ensurePageSpace(layout.metrics.lineHeight);

      const lineIndent = line.firstLine ? layout.metrics.firstLineIndent : 0;
      const widthLimit = Math.max(0, pdfLayout.innerWidth - lineIndent);
      const lineY = cursorY;
      renderStyledLine({
        line: { ...line, isLastLine: lineIndex === layout.lines.length - 1 },
        align: paragraphAlign,
        lineX: pdfLayout.marginLeft + lineIndent,
        lineY,
        widthLimit
      });

      cursorY -= layout.metrics.lineHeight;
    }

    cursorY -= layout.metrics.afterSpacing;
    if (cursorY < pdfLayout.marginBottom) {
      pages.push([]);
      pageIndex += 1;
      cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
    }
  };

  const buildPdfTableRowRender = (row, rowIndex, columnWidth, cellInnerWidth) => {
    const isHeader = rowIndex === 0;
    const layouts = row.map((cellText) =>
      buildParagraphLayout(
        {
          kind: "body",
          align: "left",
          runs: plainTextRuns(cellText, { bold: isHeader })
        },
        {
          ...pdfLayout,
          innerWidth: cellInnerWidth
        }
      )
    );
    const contentHeight = layouts.reduce(
      (max, layout) => Math.max(max, Math.max(layout.metrics.lineHeight, layout.lines.length * layout.metrics.lineHeight)),
      0
    );
    return {
      isHeader,
      columnWidth,
      layouts,
      rowHeight: contentHeight + 12
    };
  };

  const renderPdfTableRow = (rowRender) => {
    const rowTop = cursorY;
    const rowBottom = rowTop - rowRender.rowHeight;
    const borderCommands = [];

    rowRender.layouts.forEach((layout, columnIndex) => {
      const cellX = pdfLayout.marginLeft + columnIndex * rowRender.columnWidth;
      const cellInnerWidth = Math.max(20, rowRender.columnWidth - 16);
      if (rowRender.isHeader) {
        pushCommand(
          `0.9 g\n${formatPdfNumber(cellX)} ${formatPdfNumber(rowBottom)} ${formatPdfNumber(rowRender.columnWidth)} ${formatPdfNumber(
            rowRender.rowHeight
          )} re f\n0 G\n`
        );
      }

      let lineY = rowTop - 6 - layout.metrics.fontSize;
      layout.lines.forEach((line, lineIndex) => {
        renderStyledLine({
          line: { ...line, isLastLine: lineIndex === layout.lines.length - 1 },
          align: "left",
          lineX: cellX + 8,
          lineY,
          widthLimit: cellInnerWidth,
          allowJustify: false
        });
        lineY -= layout.metrics.lineHeight;
      });

      borderCommands.push(
        `${formatPdfNumber(cellX)} ${formatPdfNumber(rowBottom)} ${formatPdfNumber(rowRender.columnWidth)} ${formatPdfNumber(
          rowRender.rowHeight
        )} re S`
      );
    });

    if (borderCommands.length > 0) {
      pushCommand(`0 G\n0.5 w\n${borderCommands.join("\n")}\n`);
    }
    cursorY = rowBottom;
  };

  const renderTableParagraph = (paragraph) => {
    const rows = Array.isArray(paragraph && paragraph.rows) ? paragraph.rows.filter((row) => Array.isArray(row)) : [];
    if (rows.length === 0) {
      const captionText = String(paragraph && paragraph.caption ? paragraph.caption : "").trim();
      if (captionText) {
        renderTextParagraph({
          kind: "body",
          align: "center",
          runs: plainTextRuns(captionText)
        });
      }
      return;
    }

    const captionText = String(paragraph.caption || "").trim();
    if (captionText) {
      renderTextParagraph({
        kind: "body",
        align: "center",
        runs: plainTextRuns(captionText)
      });
    }

    const columnCount = Math.max(1, rows.reduce((max, row) => Math.max(max, row.length), 0));
    const normalizedRows = rows.map((row) => {
      const output = row.slice(0, columnCount).map((cell) => String(cell == null ? "" : cell));
      while (output.length < columnCount) {
        output.push("");
      }
      return output;
    });
    const columnWidth = pdfLayout.innerWidth / columnCount;
    const cellInnerWidth = Math.max(20, columnWidth - 16);
    const headerRow = buildPdfTableRowRender(normalizedRows[0], 0, columnWidth, cellInnerWidth);

    for (let rowIndex = 0; rowIndex < normalizedRows.length; rowIndex += 1) {
      const rowRender = buildPdfTableRowRender(normalizedRows[rowIndex], rowIndex, columnWidth, cellInnerWidth);
      if (cursorY - rowRender.rowHeight < pdfLayout.marginBottom && currentPage().length > 0) {
        pages.push([]);
        pageIndex += 1;
        cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
        if (rowIndex > 0) {
          renderPdfTableRow(headerRow);
        }
      }
      renderPdfTableRow(rowRender);
    }

    cursorY -= 8;
    if (cursorY < pdfLayout.marginBottom) {
      pages.push([]);
      pageIndex += 1;
      cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
    }
  };

  for (const paragraph of model.paragraphs) {
    if (paragraph.kind === "pageBreak") {
      const isAtTopOfPage = Math.abs(cursorY - (pdfLayout.pageHeight - pdfLayout.marginTop)) < 0.001;
      if (!isAtTopOfPage || currentPage().length > 0) {
        pages.push([]);
        pageIndex += 1;
        cursorY = pdfLayout.pageHeight - pdfLayout.marginTop;
      }
      continue;
    }

    if (paragraph.kind === "table") {
      renderTableParagraph(paragraph);
      continue;
    }

    if (paragraph.kind === "mediaFigure") {
      const asset = await resolveMediaAssetForParagraph(paragraph, mediaAssetCache);
      const captionParagraph = mediaCaptionParagraphFromMedia(paragraph);
      if (!asset || !(asset.bytes instanceof Uint8Array) || asset.bytes.length === 0) {
        renderTextParagraph(captionParagraph);
        continue;
      }

      const maxMediaHeightPt = Math.max(120, pdfLayout.innerHeight * 0.58);
      const size = computeMediaRenderSizePt(asset, pdfLayout.innerWidth, maxMediaHeightPt, paragraph.widthPercent);
      const captionLayout = buildParagraphLayout(captionParagraph, pdfLayout);
      const captionHeight =
        captionLayout.lines.length * captionLayout.metrics.lineHeight + Math.max(0, captionLayout.metrics.afterSpacing);
      ensurePageSpace(size.heightPt + 8 + captionHeight);

      let imageX = pdfLayout.marginLeft;
      const align = normalizeParagraphAlignment(paragraph.align || "center");
      if (align === "center") {
        imageX += Math.max(0, (pdfLayout.innerWidth - size.widthPt) / 2);
      } else if (align === "right") {
        imageX += Math.max(0, pdfLayout.innerWidth - size.widthPt);
      }
      const imageY = cursorY - size.heightPt;
      const resourceName = `Im${nextImageResourceId++}`;
      const images = pageImages.get(pageIndex) || [];
      images.push({
        name: resourceName,
        bytes: asset.bytes,
        widthPx: Math.max(1, Math.round(asset.widthPx || 1)),
        heightPx: Math.max(1, Math.round(asset.heightPx || 1))
      });
      pageImages.set(pageIndex, images);

      pushCommand(
        `q\n${formatPdfNumber(size.widthPt)} 0 0 ${formatPdfNumber(size.heightPt)} ${formatPdfNumber(imageX)} ${formatPdfNumber(
          imageY
        )} cm\n/${resourceName} Do\nQ\n`
      );

      cursorY = imageY - 8;
      renderTextParagraph(captionParagraph);
      continue;
    }

    renderTextParagraph(paragraph);
  }

  while (pages.length > 1 && pages[pages.length - 1].length === 0) {
    pages.pop();
  }

  return {
    streams: pages.map((commands) => commands.join("")),
    citationLinks,
    pageImages,
    referenceTargets: Array.from(referenceTargets.entries()).map(([citationId, target]) => ({
      citationId,
      ...target
    }))
  };
};

const buildPdfBlobFromModel = async (model, pdfLayout) => {
  const rendered = await renderModelToPdfStreams(model, pdfLayout);
  const streams = rendered.streams;
  if (streams.length === 0) {
    streams.push("");
  }

  const referenceTargetByCitationId = new Map(
    rendered.referenceTargets.map((target) => [
      target.citationId,
      {
        pageIndex: target.pageIndex,
        x: Math.max(0, Math.min(pdfLayout.pageWidth, target.x)),
        y: Math.max(0, Math.min(pdfLayout.pageHeight, target.y))
      }
    ])
  );

  let nextObjectId = 1;
  const allocateObjectId = () => {
    const id = nextObjectId;
    nextObjectId += 1;
    return id;
  };

  const catalogId = allocateObjectId();
  const pagesId = allocateObjectId();
  const fontRomanId = allocateObjectId();
  const fontBoldId = allocateObjectId();
  const fontItalicId = allocateObjectId();
  const fontBoldItalicId = allocateObjectId();

  const objects = {};
  objects[fontRomanId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Roman >>";
  objects[fontBoldId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Bold >>";
  objects[fontItalicId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-Italic >>";
  objects[fontBoldItalicId] = "<< /Type /Font /Subtype /Type1 /BaseFont /Times-BoldItalic >>";

  const pageDescriptors = streams.map((stream, index) => ({
    stream,
    pageIndex: index,
    contentObjectId: allocateObjectId(),
    pageObjectId: allocateObjectId(),
    imageResources: []
  }));

  pageDescriptors.forEach((pageDescriptor) => {
    const images = rendered.pageImages instanceof Map ? rendered.pageImages.get(pageDescriptor.pageIndex) || [] : [];
    const imageResources = [];
    images.forEach((image) => {
      if (!(image.bytes instanceof Uint8Array) || image.bytes.length === 0) return;
      imageResources.push({
        name: String(image.name || ""),
        widthPx: Math.max(1, Math.round(image.widthPx || 1)),
        heightPx: Math.max(1, Math.round(image.heightPx || 1)),
        hexData: bytesToPdfHex(image.bytes),
        objectId: allocateObjectId()
      });
    });
    pageDescriptor.imageResources = imageResources;
  });

  const pageAnnotations = new Map();
  rendered.citationLinks.forEach((link) => {
    const target = referenceTargetByCitationId.get(link.citationId);
    if (!target) return;

    const x1 = Math.max(0, Math.min(pdfLayout.pageWidth, link.rect.x1));
    const x2 = Math.max(0, Math.min(pdfLayout.pageWidth, link.rect.x2));
    const y1 = Math.max(0, Math.min(pdfLayout.pageHeight, link.rect.y1));
    const y2 = Math.max(0, Math.min(pdfLayout.pageHeight, link.rect.y2));
    const width = Math.max(2, Math.abs(x2 - x1));
    const height = Math.max(2, Math.abs(y2 - y1));

    const annotation = {
      objectId: allocateObjectId(),
      rect: {
        x1: Math.min(x1, x2),
        y1: Math.min(y1, y2),
        x2: Math.min(pdfLayout.pageWidth, Math.min(x1, x2) + width),
        y2: Math.min(pdfLayout.pageHeight, Math.min(y1, y2) + height)
      },
      destination: target
    };

    const list = pageAnnotations.get(link.pageIndex) || [];
    list.push(annotation);
    pageAnnotations.set(link.pageIndex, list);
  });

  pageDescriptors.forEach((page) => {
    objects[page.contentObjectId] = `<< /Length ${page.stream.length} >>\nstream\n${page.stream}endstream`;
  });

  pageDescriptors.forEach((page) => {
    page.imageResources.forEach((image) => {
      const stream = `${image.hexData}>`;
      objects[image.objectId] =
        `<< /Type /XObject /Subtype /Image /Width ${image.widthPx} /Height ${image.heightPx} /ColorSpace /DeviceRGB /BitsPerComponent 8 ` +
        `/Filter [/ASCIIHexDecode /DCTDecode] /Length ${stream.length} >>\nstream\n${stream}\nendstream`;
    });
  });

  pageDescriptors.forEach((page, index) => {
    const annotations = pageAnnotations.get(index) || [];
    const validAnnotations = [];

    for (const annotation of annotations) {
      const destinationPage = pageDescriptors[annotation.destination.pageIndex];
      if (!destinationPage) continue;

      const rect = annotation.rect;
      objects[annotation.objectId] =
        `<< /Type /Annot /Subtype /Link /Rect [${formatPdfNumber(rect.x1)} ${formatPdfNumber(rect.y1)} ${formatPdfNumber(rect.x2)} ${formatPdfNumber(rect.y2)}] ` +
        `/Border [0 0 0] /Dest [${destinationPage.pageObjectId} 0 R /XYZ ${formatPdfNumber(annotation.destination.x)} ${formatPdfNumber(annotation.destination.y)} 0] >>`;
      validAnnotations.push(annotation);
    }

    const annotationRefs =
      validAnnotations.length > 0
        ? ` /Annots [${validAnnotations.map((annotation) => `${annotation.objectId} 0 R`).join(" ")}]`
        : "";
    const xObjectRefs =
      page.imageResources.length > 0
        ? ` /XObject << ${page.imageResources.map((image) => `/${image.name} ${image.objectId} 0 R`).join(" ")} >>`
        : "";

    objects[page.pageObjectId] =
      `<< /Type /Page /Parent ${pagesId} 0 R /MediaBox [0 0 ${formatPdfNumber(pdfLayout.pageWidth)} ${formatPdfNumber(pdfLayout.pageHeight)}] ` +
      `/Resources << /Font << /F1 ${fontRomanId} 0 R /F2 ${fontBoldId} 0 R /F3 ${fontItalicId} 0 R /F4 ${fontBoldItalicId} 0 R >>${xObjectRefs} >> ` +
      `/Contents ${page.contentObjectId} 0 R${annotationRefs} >>`;
  });

  objects[pagesId] = `<< /Type /Pages /Count ${pageDescriptors.length} /Kids [${pageDescriptors
    .map((page) => `${page.pageObjectId} 0 R`)
    .join(" ")}] >>`;
  objects[catalogId] = `<< /Type /Catalog /Pages ${pagesId} 0 R >>`;

  let pdf = "%PDF-1.4\n%paper\n";
  const offsets = new Array(nextObjectId).fill(0);

  for (let id = 1; id < nextObjectId; id += 1) {
    offsets[id] = pdf.length;
    pdf += `${id} 0 obj\n${objects[id]}\nendobj\n`;
  }

  const xrefOffset = pdf.length;
  pdf += `xref\n0 ${nextObjectId}\n0000000000 65535 f \n`;
  for (let id = 1; id < nextObjectId; id += 1) {
    pdf += `${String(offsets[id]).padStart(10, "0")} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${nextObjectId} /Root ${catalogId} 0 R >>\nstartxref\n${xrefOffset}\n%%EOF`;

  return new Blob([pdf], { type: PDF_MIME });
};

const exportDocx = async () => {
  try {
    flushDeferredLatexRender();
    const model = buildDocumentModel();
    const docxLayout = currentDocxLayout();
    const blob = await buildDocxBlobFromModel(model, docxLayout);
    const suggestedName = ensureExtension(exportBaseName(), ".docx");
    await saveBlobFile({
      blob,
      suggestedName,
      description: "Word Document",
      mime: DOCX_MIME,
      extensions: [".docx"]
    });
  } catch {
    window.alert("Could not export DOCX.");
  }
};

const exportPdf = async () => {
  try {
    flushDeferredLatexRender();
    const model = buildDocumentModel();
    const pdfLayout = currentPdfLayout();
    const blob = await buildPdfBlobFromModel(model, pdfLayout);
    const suggestedName = ensureExtension(exportBaseName(), ".pdf");
    await saveBlobFile({
      blob,
      suggestedName,
      description: "PDF Document",
      mime: PDF_MIME,
      extensions: [".pdf"]
    });
  } catch {
    window.alert("Could not export PDF.");
  }
};

const applySaveFormatSelection = async () => {
  if (!saveFormatOpen) return;

  const option = SAVE_FORMAT_OPTIONS[saveFormatIndex];
  closeSaveFormatBar();
  if (!option) return;

  if (option.id === "paper") {
    await savePaper(false);
    return;
  }
  if (option.id === "docx") {
    await exportDocx();
    return;
  }
  if (option.id === "pdf") {
    await exportPdf();
  }
};

const restoreDraft = () => {
  const savedDraft = localStorage.getItem(DRAFT_STORAGE_KEY);
  if (!savedDraft) {
    titleField.innerHTML = "";
    editor.innerHTML = "<p><br></p>";
    if (referencesHeading) {
      referencesHeading.textContent = DEFAULT_REFERENCES_HEADING;
    }
    citations = [];
    metadataSettings = {
      citationFormat: "MLA",
      pageSize: "endless",
      pageOrientation: "portrait",
      pageMargins: { ...DEFAULT_PAGE_MARGINS_IN }
    };
    citationFormatSelect.value = "MLA";
    pageSizeSelect.value = "endless";
    pageOrientationSelect.value = "portrait";
    syncMarginInputs(metadataSettings.pageMargins);
    applyPageLayout();
    currentFileName = DEFAULT_FILE_NAME;
    currentFileHandle = null;
    currentNativeFilePath = "";
    setDirty(false);
    syncGraphBlocks();
    syncImageBlocks();
    syncTableNumbers();
    renderCitationList();
    syncCitationPreview();
    refreshCitationMarkersAndReferences();
    renderInlineLatex();
    return;
  }

  try {
    const parsedDraft = JSON.parse(savedDraft);
    const payload = normalizePaperPayload(parsedDraft.payload);
    const session = parsedDraft.session && typeof parsedDraft.session === "object" ? parsedDraft.session : {};

    hydrateFromPayload(payload, {
      fileName: ensurePaperExtension(session.fileName || DEFAULT_FILE_NAME),
      isDirty: Boolean(session.hasUnsavedChanges),
      keepHandle: false
    });
  } catch {
    titleField.innerHTML = "";
    editor.innerHTML = "<p><br></p>";
    if (referencesHeading) {
      referencesHeading.textContent = DEFAULT_REFERENCES_HEADING;
    }
    citations = [];
    metadataSettings = {
      citationFormat: "MLA",
      pageSize: "endless",
      pageOrientation: "portrait",
      pageMargins: { ...DEFAULT_PAGE_MARGINS_IN }
    };
    citationFormatSelect.value = "MLA";
    pageSizeSelect.value = "endless";
    pageOrientationSelect.value = "portrait";
    syncMarginInputs(metadataSettings.pageMargins);
    applyPageLayout();
    currentFileName = DEFAULT_FILE_NAME;
    currentFileHandle = null;
    currentNativeFilePath = "";
    setDirty(false);
    syncGraphBlocks();
    syncImageBlocks();
    syncTableNumbers();
    renderCitationList();
    syncCitationPreview();
    refreshCitationMarkersAndReferences();
    renderInlineLatex();
  }
};

const registerServiceWorker = async () => {
  if (supportsDesktopBridge()) return;
  if (!("serviceWorker" in navigator)) return;
  const hadController = Boolean(navigator.serviceWorker.controller);
  let refreshedForUpdate = false;
  try {
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      // Reload once when an updated worker takes over so stale cached bundles do not linger.
      if (!hadController || refreshedForUpdate) return;
      refreshedForUpdate = true;
      window.location.reload();
    });

    const registration = await navigator.serviceWorker.register(`./service-worker.js?v=${APP_ASSET_VERSION}`);
    void registration.update().catch(() => {});
  } catch {
    // Ignore registration failures; app still runs online.
  }
};

window.paper = Object.freeze({
  version: PAPER_VERSION,
  registerFeaturePersistence,
  setFeatureState,
  getFeatureState,
  savePaper,
  openPaper,
  exportDocx,
  exportPdf,
  insertSectionAtCaret,
  openCitationSidebar,
  toggleMetadataPane
});

editor.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  const target = event.target;
  if (target instanceof Element && target.closest(".image-block, .graph-block, .image-settings, .graph-settings")) {
    return;
  }

  if (editableBlockFromPoint(event.clientX, event.clientY)) {
    return;
  }

  const mediaBlock = resolveSideClickMediaBlock(event.clientX, event.clientY);
  if (!mediaBlock) return;

  event.preventDefault();
  deactivateGraphBlock();
  deactivateImageBlock();
  const result = ensureParagraphAfterMediaBlock(mediaBlock, { forceClear: true });
  if (!result.paragraph) return;
  selectStartOfNode(result.paragraph);
  if (result.changed) {
    markDocumentChanged();
  } else {
    scheduleWindowStatus(false);
  }
});

editor.addEventListener("pointerdown", (event) => {
  if (event.button !== 0) return;
  if (event.defaultPrevented) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  if (target.closest(".image-block, .graph-block, .image-settings, .graph-settings, .page-assist, .page-break-block")) {
    return;
  }
  if (editableBlockFromPoint(event.clientX, event.clientY)) return;
  if (resolveSideClickMediaBlock(event.clientX, event.clientY)) return;

  const clampedClientY = clampClientYToFixedPageContent(event.clientY);
  if (!Number.isFinite(clampedClientY)) return;

  event.preventDefault();
  const placedAtX = setSelectionFromClientPoint(event.clientX, clampedClientY);
  if (placedAtX) return;

  const editorRect = editor.getBoundingClientRect();
  const fallbackX = Math.max(editorRect.left + 8, Math.min(event.clientX, editorRect.right - 8));
  if (!setSelectionFromClientPoint(fallbackX, clampedClientY)) {
    focusEditorAtEnd();
  }
});

if (pageSurface) {
  pageSurface.addEventListener("dblclick", (event) => {
    if (event.defaultPrevented || event.button !== 0) return;
    const target = event.target;
    if (!(target instanceof Element)) return;
    if (
      target.closest(
        ".title, .editor, .references, .page-assist, .graph-block, .image-block, .graph-settings, .image-settings, .page-corner-hotspot"
      )
    ) {
      return;
    }

    const hit = resolveHeaderFooterMarginHit(event.clientX, event.clientY);
    if (!hit) return;

    event.preventDefault();
    event.stopPropagation();
    closePageCornerMenu();
    const assist = insertPageAssistForPage(hit.kind, hit.pageIndex, { focus: true, scroll: false });
    if (assist instanceof HTMLElement) {
      delete assist.dataset.pageContentEmpty;
      scheduleAutoPageBreakGuidesSoft();
    }
  });
}

editor.addEventListener("dragstart", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;

  const block = target.closest(".graph-block, .image-block, table");
  if (!(block instanceof HTMLElement) || !editor.contains(block)) return;
  if (block instanceof HTMLTableElement && block.closest(".graph-block, .image-block")) return;

  // Do not initiate block dragging while interacting with controls inside media settings panes.
  if (target.closest(".graph-settings, .image-settings")) {
    event.preventDefault();
    return;
  }

  if (target.closest("input, textarea, button, select, option, label")) {
    event.preventDefault();
    return;
  }

  draggedMediaBlock = block;
  mediaDropPlacement = null;
  block.classList.add("is-dragging-media");
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = "copyMove";
    event.dataTransfer.setData("text/plain", "paper-media-block");
    const payload = slotPayloadFromEditorMediaBlock(block);
    if (payload) {
      event.dataTransfer.setData("application/x-paper-media", JSON.stringify(payload));
      event.dataTransfer.setData("text/x-paper-media", JSON.stringify(payload));
    }
  }
});

editor.addEventListener("dragover", (event) => {
  updateMediaDragPlacementFromEvent(event);
});

editor.addEventListener("drop", (event) => {
  finalizeMediaDragDropFromEvent(event);
});

editor.addEventListener("dragend", () => {
  clearMediaDragState();
});

editor.addEventListener("dragleave", (event) => {
  if (!(draggedMediaBlock instanceof HTMLElement)) return;
  const rect = editor.getBoundingClientRect();
  const stillInsideEditor =
    event.clientX >= rect.left &&
    event.clientX <= rect.right &&
    event.clientY >= rect.top &&
    event.clientY <= rect.bottom;
  if (stillInsideEditor) return;
  const related = event.relatedTarget;
  if (related instanceof Node && editor.contains(related)) return;
  mediaDropPlacement = null;
  clearMediaDropIndicator();
});

document.addEventListener("pointerdown", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) {
    closePageCornerMenu();
    deactivateGraphBlock();
    deactivateImageBlock();
    closeTableSidebar();
    return;
  }
  if (!target.closest(".page-corner-hotspot")) {
    closePageCornerMenu();
  }
  const graphBlock = target.closest(".graph-block");
  const imageBlock = target.closest(".image-block");
  const table = target.closest("table");
  const insideTableSidebar = tableSidebar instanceof HTMLElement && tableSidebar.contains(target);
  if (graphBlock && editor.contains(graphBlock)) {
    activateGraphBlock(graphBlock);
    closeTableSidebar();
  } else if (imageBlock && editor.contains(imageBlock)) {
    activateImageBlock(imageBlock);
    closeTableSidebar();
  } else if (table instanceof HTMLTableElement && editor.contains(table)) {
    deactivateGraphBlock();
    deactivateImageBlock();
    openTableSidebarForTable(table);
  } else {
    deactivateGraphBlock();
    deactivateImageBlock();
    if (!insideTableSidebar) {
      closeTableSidebar();
    }
  }
});

document.addEventListener("click", (event) => {
  if (event.defaultPrevented || event.button !== 0) return;
  const target = event.target;
  if (!(target instanceof Element)) return;
  const anchor = target.closest("a[href]");
  if (!(anchor instanceof HTMLAnchorElement)) return;
  if (!isEditableSurfaceAnchor(anchor)) return;
  if (event.shiftKey) return;

  event.preventDefault();
  event.stopPropagation();
  openAnchorFromEditableSurface(anchor);
});

document.addEventListener("keydown", (event) => {
  const isMod = event.metaKey || event.ctrlKey;
  const key = event.key.toLowerCase();
  const isBackslashKey = key === "\\" || event.code === "Backslash";
  const activeElement = document.activeElement instanceof Element ? document.activeElement : null;
  const focusInCitationFormControls = Boolean(
    activeElement &&
      activeElement.closest(".citation-sidebar") &&
      activeElement.matches("input, textarea, select, .citation-add-button")
  );
  const focusInMediaStorageControls =
    activeElement && Boolean(activeElement.closest(".media-storage-sidebar"));
  const focusInTableSidebarControls =
    activeElement && Boolean(activeElement.closest(".table-sidebar"));
  const focusInGraphControls =
    activeElement && Boolean(activeElement.closest(".graph-block, .image-block"));

  if (event.key === "Escape" && openPageCornerMenu) {
    event.preventDefault();
    closePageCornerMenu();
    return;
  }

  if (isMod && !event.altKey && !event.shiftKey && key === "m") {
    event.preventDefault();
    toggleMetadataPane();
    return;
  }

  if (isMod && !event.altKey && !event.shiftKey && isBackslashKey) {
    event.preventDefault();
    toggleMediaStorageSidebar();
    return;
  }

  if (isMod && !event.altKey) {
    if (key === "s") {
      event.preventDefault();
      if (event.shiftKey) {
        closeSaveFormatBar();
        savePaper(false);
      } else {
        openSaveFormatBar();
      }
      return;
    }

    if (!event.shiftKey && key === "o") {
      event.preventDefault();
      openPaper();
      return;
    }
  }

  if (event.key === "Escape" && mediaStorageSidebarOpen) {
    event.preventDefault();
    closeMediaStorageSidebar();
    ensureSelectionOnSurface();
    return;
  }

  if (focusInMediaStorageControls) {
    return;
  }

  if (focusInTableSidebarControls) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeTableSidebar();
      ensureSelectionOnSurface();
    }
    return;
  }

  if (isMod && event.altKey && !event.shiftKey) {
    if (key === "n") {
      event.preventDefault();
      insertSectionAtCaret(2);
      return;
    }
    if (key === "2") {
      event.preventDefault();
      insertSectionAtCaret(2);
      return;
    }
    if (key === "3") {
      event.preventDefault();
      insertSectionAtCaret(3);
      return;
    }
    if (key === "4") {
      event.preventDefault();
      insertSectionAtCaret(4);
      return;
    }
    if (key === "d") {
      event.preventDefault();
      closeSaveFormatBar();
      exportDocx();
      return;
    }
    if (key === "p") {
      event.preventDefault();
      closeSaveFormatBar();
      exportPdf();
      return;
    }
  }

  if (metadataOpen) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeMetadataPane();
      ensureSelectionOnSurface();
      return;
    }
    if (event.key !== "Tab") {
      return;
    }
  }

  if (saveFormatOpen) {
    if (event.key === "Tab") {
      event.preventDefault();
      closeSaveFormatBar();
      clearTabHoldTimer();
      tabTapPending = false;
      tabTapOutdent = false;
      tabHeld = true;
      openSectionFinder();
      return;
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      moveSaveFormatSelection(1);
      return;
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      moveSaveFormatSelection(-1);
      return;
    }
    if (event.key === "Enter") {
      event.preventDefault();
      applySaveFormatSelection();
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      closeSaveFormatBar();
      return;
    }
    if (event.key === "1" || event.key === "2" || event.key === "3") {
      event.preventDefault();
      const nextIndex = Number(event.key) - 1;
      if (nextIndex >= 0 && nextIndex < SAVE_FORMAT_OPTIONS.length) {
        saveFormatIndex = nextIndex;
        updateSaveFormatVisuals();
        applySaveFormatSelection();
      }
      return;
    }
  }

  if (citationSidebarOpen) {
    if (event.key === "Escape") {
      event.preventDefault();
      closeCitationSidebar();
      ensureSelectionOnSurface();
      return;
    }

    if ((isMod || event.shiftKey) && event.key === "Enter" && focusInCitationFormControls) {
      event.preventDefault();
      addCitation(true);
      return;
    }

    if (!focusInCitationFormControls) {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        citationIndex = Math.min(citations.length - 1, citationIndex + 1);
        renderCitationList();
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        citationIndex = Math.max(0, citationIndex - 1);
        renderCitationList();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (citations[citationIndex]) {
          insertCitationMarker(citations[citationIndex].id);
        }
        return;
      }
      if (event.key === "Tab") {
        event.preventDefault();
        if (citationAuthorInput instanceof HTMLElement) {
          citationAuthorInput.focus({ preventScroll: true });
        } else if (citationInput instanceof HTMLElement) {
          citationInput.focus({ preventScroll: true });
        }
        return;
      }
    }
  }

  if (event.key === "Escape" && tableSidebarOpen) {
    event.preventDefault();
    closeTableSidebar();
    ensureSelectionOnSurface();
    return;
  }

  if (focusInGraphControls) {
    if (event.key === "Escape") {
      event.preventDefault();
      deactivateGraphBlock();
      deactivateImageBlock();
      ensureSelectionOnSurface();
    }
    return;
  }

  if (
    !isMod &&
    !event.altKey &&
    !event.shiftKey &&
    !event.repeat &&
    (event.key === "Backspace" || event.key === "Delete")
  ) {
    const selection = window.getSelection();
    const anchorNode = selection && selection.rangeCount > 0 ? selection.anchorNode : null;
    if (selection && selection.isCollapsed && anchorNode && editor.contains(anchorNode)) {
      const direction = event.key === "Backspace" ? -1 : 1;
      if (latexTokenAdjacentToCaret(direction)) {
        event.preventDefault();
        markDocumentChanged();
        return;
      }
    }
  }

  if (event.key === "Backspace" && !isMod && !event.altKey && handleBackspaceAcrossPages()) {
    event.preventDefault();
    return;
  }

  if (
    event.key === "Enter" &&
    event.ctrlKey &&
    !event.metaKey &&
    !event.altKey &&
    !event.shiftKey &&
    !menuOpen &&
    !sectionFinderOpen &&
    !tabHeld
  ) {
    event.preventDefault();
    closeInlineCommandMenu();
    insertPageBreakAtCaret();
    return;
  }

  if (event.key === "Escape" && inlineCommandOpen) {
    event.preventDefault();
    closeInlineCommandMenu();
    return;
  }

  if (event.key === "Enter" && inlineCommandOpen && !isMod && !event.altKey && !event.shiftKey) {
    event.preventDefault();
    if (executeSelectedInlineCommandAtCaret()) {
      return;
    }
  }

  if (event.key === "Tab" && !isMod && !event.altKey) {
    const direction = event.shiftKey ? -1 : 1;
    if (completeInlineCommandAtCaret(direction)) {
      event.preventDefault();
      return;
    }
  }

  const shortcutCommand = resolveShortcutCommand(event);
  if (shortcutCommand) {
    event.preventDefault();
    executeEditorCommand(shortcutCommand);
    return;
  }

  if (event.key === "Shift" && !event.repeat) {
    const now = performance.now();
    const isDoubleShift = now - lastShiftTapAt <= DOUBLE_SHIFT_WINDOW_MS;
    lastShiftTapAt = now;

    if (isDoubleShift) {
      event.preventDefault();
      lastShiftTapAt = 0;
      if (menuOpen) {
        closeMenuAndReset();
      } else {
        openMenuAtCaret();
      }
      return;
    }

    if (menuOpen) {
      event.preventDefault();
      moveMenu(1);
      positionMenuUnderCaret();
    }
    return;
  }

  if (event.key === "Tab" && menuOpen) {
    event.preventDefault();
    const direction = event.shiftKey ? -1 : 1;
    moveMenu(direction);
    positionMenuUnderCaret();
    return;
  }

  if (
    menuOpen &&
    !isMod &&
    !event.altKey &&
    (event.key === "ArrowRight" || event.key === "ArrowDown" || event.key === "ArrowLeft" || event.key === "ArrowUp")
  ) {
    event.preventDefault();
    const direction = event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1;
    moveMenu(direction);
    positionMenuUnderCaret();
    return;
  }

  if (event.key === "Tab") {
    event.preventDefault();

    if (sectionFinderOpen || tabHeld) {
      if (!event.repeat) {
        moveSectionSelection(event.shiftKey ? -1 : 1);
      }
      return;
    }

    if (event.repeat || tabHoldTimer) {
      return;
    }

    tabTapPending = true;
    tabTapOutdent = event.shiftKey;
    tabHoldTimer = setTimeout(() => {
      tabHoldTimer = null;
      if (!tabTapPending) return;
      tabTapPending = false;
      tabHeld = true;
      openSectionFinder();
    }, TAB_HOLD_OPEN_MS);
    return;
  }

  if (tabHeld || sectionFinderOpen) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      moveSectionSelection(1);
      return;
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      moveSectionSelection(-1);
      return;
    }
    if (event.key === "-" || event.key === "_") {
      event.preventDefault();
      moveSectionSelection(-1);
      return;
    }
    if (event.key === "+" || (event.key === "=" && event.shiftKey)) {
      event.preventDefault();
      moveSectionSelection(1);
      return;
    }
    if (event.key === "Escape") {
      event.preventDefault();
      resetTabState();
      closeSectionFinder();
      return;
    }
  }

  if (event.key === "Enter" && menuOpen) {
    event.preventDefault();
    applyMenuOption();
    return;
  }

  if (event.key === "Escape" && menuOpen) {
    event.preventDefault();
    closeMenuAndReset();
    return;
  }

  if (event.key !== "Shift") {
    lastShiftTapAt = 0;
  }
});

document.addEventListener("keyup", (event) => {
  if (event.key !== "Tab") return;

  if (tabHoldTimer) {
    clearTabHoldTimer();
    if (tabTapPending) {
      applyTabIndent(tabTapOutdent);
    }
    tabTapPending = false;
    tabTapOutdent = false;
    return;
  }

  tabTapPending = false;
  tabTapOutdent = false;
  if (!tabHeld && !sectionFinderOpen) return;
  tabHeld = false;
  closeSectionFinder();
});

document.addEventListener("selectionchange", () => {
  if (mediaStorageSidebarOpen) {
    const nextRange = captureCurrentSelectionRange(editor);
    if (nextRange) {
      mediaStorageInsertRange = nextRange;
    }
  }

  if (menuOpen && isInsideFormattingSurface(getSelectionNode())) {
    menuAnchorRange = captureMenuAnchorRange();
    positionMenuUnderCaret();
    updateMenuVisuals();
  }

  if (skipInlineCommandSyncOnce) {
    skipInlineCommandSyncOnce = false;
    positionInlineCommandMenu();
  } else {
    syncInlineCommandMenu();
  }

  if (sectionFinderOpen) {
    sectionEntries = collectSectionEntries();
    sectionIndex = detectActiveSectionIndex(sectionEntries);
    renderSectionFinder();
  }

  syncTableSidebarFromSelection();

  scheduleWindowStatus(false);
});

window.addEventListener(
  "scroll",
  () => {
    positionMenuUnderCaret();
    positionInlineCommandMenu();
    scheduleWindowStatus(false);
  },
  true
);

window.addEventListener("resize", () => {
  positionMenuUnderCaret();
  positionInlineCommandMenu();
  scheduleWindowStatus(false);
  scheduleAutoPageBreakGuides();
});
window.addEventListener("blur", () => {
  const mediaDragInProgress =
    draggedMediaBlock instanceof HTMLElement &&
    (draggedMediaBlock.classList.contains("graph-block") ||
      draggedMediaBlock.classList.contains("image-block") ||
      draggedMediaBlock instanceof HTMLTableElement);
  if (autoLinkTimer) {
    clearTimeout(autoLinkTimer);
    autoLinkTimer = null;
  }
  pendingAutoLinkIncludePrevious = false;
  resetTabState();
  closeSectionFinder();
  closeSaveFormatBar();
  closeCitationSidebar();
  if (!mediaDragInProgress) {
    closeMediaStorageSidebar();
  }
  closeMetadataPane();
  closeTableSidebar();
  closePageCornerMenu();
  deactivateGraphBlock();
  deactivateImageBlock();
  if (!mediaDragInProgress) {
    clearMediaDragState();
  }
  closeInlineCommandMenu();
  flushDeferredLatexRender();
});

titleField.addEventListener("keydown", (event) => {
  if (event.key !== "Enter") return;
  event.preventDefault();
  editor.focus({ preventScroll: true });
});

const syncSectionFinderIfOpen = () => {
  if (!sectionFinderOpen) return;
  sectionEntries = collectSectionEntries();
  sectionIndex = detectActiveSectionIndex(sectionEntries);
  renderSectionFinder();
};

const handleTitleInput = (event) => {
  markDocumentChanged();
  closeInlineCommandMenu();
  syncSectionFinderIfOpen();
  if (shouldScheduleAutoLinkFromInputEvent(event)) {
    scheduleAutoLinkNearCaret(shouldIncludePreviousBlockForAutoLink(event));
  }
};

const persistReferencesHeading = (normalize = false) => {
  if (!referencesHeading) return;
  const nextValue = normalize
    ? normalizeReferencesHeading(referencesHeading.textContent)
    : sanitizeReferencesHeading(referencesHeading.textContent);
  if (normalize && referencesHeading.textContent !== nextValue) {
    referencesHeading.textContent = nextValue;
  }
  setFeatureState("referencesHeading", nextValue);
};

const handleEditorInput = (event) => {
  const target = event && event.target instanceof Node ? event.target : null;
  const element = target instanceof Element ? target : target && target.parentElement;
  const tableElement = element && element.closest("table");
  const shouldAutoLink = shouldScheduleAutoLinkFromInputEvent(event);
  const includePreviousBlock = shouldIncludePreviousBlockForAutoLink(event);
  if (element && element.closest(".graph-block, .image-block")) {
    return;
  }
  if (tableElement instanceof HTMLTableElement) {
    openTableSidebarForTable(tableElement);
  }
  const pageAssist = element && element.closest(".page-assist");
  if (pageAssist && editor.contains(pageAssist)) {
    if (pageAssist.dataset.pageRepeatAuto === "true") {
      pageAssist.dataset.pageRepeatAuto = "false";
      pageAssist.dataset.pageRepeatManual = "true";
    }
    const pageAssistKind = normalizePageAssistKind(pageAssist);
    const isRepeatedPageSource =
      (pageAssistKind === "header" || pageAssistKind === "footer" || pageAssistKind === "page-number") &&
      String(pageAssist.dataset.pageIndex || "") === "1";
    if (pageAssist.dataset.pageNumberAuto === "true" && !isRepeatedPageSource) {
      delete pageAssist.dataset.pageNumberAuto;
      delete pageAssist.dataset.pageNumberFormat;
      if (pageAssistKind === "page-number") {
        pageAssist.dataset.pageNumberManual = "true";
      }
    }
    if (syncPageAssistVisibility(pageAssist)) {
      scheduleAutoPageBreakGuides();
    }
    markDocumentChanged();
    closeInlineCommandMenu();
    syncSectionFinderIfOpen();
    if (shouldAutoLink) {
      scheduleAutoLinkNearCaret(includePreviousBlock);
    }
    return;
  }

  const inputType = String((event && event.inputType) || "");
  const activeTopLevelBlock = element ? editorTopLevelChildForNode(element) : null;
  markDocumentChanged({ deferPageGuides: true });
  consumeInlineCommandAtCaret(editor);
  consumeAutoListTrigger(editor);
  pruneEmptySectionHeadings(editor, { preserveSelectionHeading: true });
  scheduleDeferredLatexRender();
  const isBulkInput =
    inputType === "insertFromPaste" ||
    inputType === "insertFromDrop" ||
    inputType === "historyUndo" ||
    inputType === "historyRedo";
  if (isBulkInput) {
    scheduleAutoPageBreakGuidesSoft();
  } else {
    scheduleAutoPageBreakGuidesForTyping({
      withinTable: tableElement instanceof HTMLTableElement,
      relaxed: shouldUseRelaxedTypingPageGuideDelay(activeTopLevelBlock, inputType)
    });
  }
  const mightChangeMediaStructure =
    inputType === "insertFromPaste" ||
    inputType === "insertFromDrop" ||
    inputType === "historyUndo" ||
    inputType === "historyRedo" ||
    inputType.startsWith("delete");
  const mightDeleteTableStructure = inputType.startsWith("delete") && !tableElement;
  const mightChangeTableStructure =
    inputType === "insertFromPaste" ||
    inputType === "insertFromDrop" ||
    inputType === "historyUndo" ||
    inputType === "historyRedo" ||
    mightDeleteTableStructure;
  if (mightChangeMediaStructure) {
    scheduleMediaBlockSync(true);
  }
  if (mightChangeTableStructure) {
    syncTableNumbers();
  }
  if (tableElement instanceof HTMLTableElement && activeTableElement === tableElement) {
    syncTableSidebarControls();
  }
  syncInlineCommandMenu();
  syncSectionFinderIfOpen();
  if (citationSidebarOpen && (tableElement || mightChangeTableStructure)) {
    renderCitationList();
  }
  if (shouldAutoLink) {
    scheduleAutoLinkNearCaret(includePreviousBlock);
  }
};

titleField.addEventListener("input", handleTitleInput);
if (referencesHeading) {
  referencesHeading.addEventListener("input", (event) => {
    persistReferencesHeading(false);
    if (shouldScheduleAutoLinkFromInputEvent(event)) {
      scheduleAutoLinkNearCaret(shouldIncludePreviousBlockForAutoLink(event));
    }
  });
  referencesHeading.addEventListener("blur", () => {
    persistReferencesHeading(true);
  });
  referencesHeading.addEventListener("keydown", (event) => {
    if (event.key !== "Enter") return;
    event.preventDefault();
    referencesHeading.blur();
  });
}
editor.addEventListener("input", handleEditorInput);
editor.addEventListener("focusin", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const table = target.closest("table");
  if (table instanceof HTMLTableElement && editor.contains(table)) {
    openTableSidebarForTable(table);
  }
  const pageAssist = target.closest(".page-assist");
  if (!(pageAssist instanceof HTMLElement) || !editor.contains(pageAssist)) return;
  const kind = resolvePageAssistBoundaryKind(pageAssist);
  if (kind === "header" || kind === "footer") {
    scheduleAutoPageBreakGuidesSoft();
  }
});
editor.addEventListener("focusout", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const pageAssist = target.closest(".page-assist");
  if (!(pageAssist instanceof HTMLElement) || !editor.contains(pageAssist)) return;

  window.requestAnimationFrame(() => {
    if (!pageAssist.isConnected) return;
    const kind = resolvePageAssistBoundaryKind(pageAssist);
    if (syncPageAssistVisibility(pageAssist)) {
      scheduleAutoPageBreakGuides();
      return;
    }
    if (kind === "header" || kind === "footer") {
      scheduleAutoPageBreakGuidesSoft();
    }
  });
});
editor.addEventListener("focusout", () => {
  window.requestAnimationFrame(() => {
    const active = document.activeElement;
    if (active instanceof Element && editor.contains(active)) return;
    if (!pruneEmptySectionHeadings(editor)) return;
    markDocumentChanged();
    syncSectionFinderIfOpen();
  });
});
editor.addEventListener("dblclick", (event) => {
  const target = event.target;
  if (!(target instanceof Element)) return;
  const token = target.closest(".latex-token");
  if (!token || !editor.contains(token)) return;
  event.preventDefault();
  if (convertLatexTokenToEditableText(token)) {
    markDocumentChanged();
  }
});

document.addEventListener("dragover", (event) => {
  if (updateMediaDragPlacementFromEvent(event)) {
    return;
  }

  const imageFiles = imageFilesFromDataTransfer(event.dataTransfer);
  if (imageFiles.length === 0) return;
  event.preventDefault();
  if (event.dataTransfer) {
    event.dataTransfer.dropEffect = "copy";
  }
});

document.addEventListener("drop", (event) => {
  if (finalizeMediaDragDropFromEvent(event)) {
    return;
  }

  const imageFiles = imageFilesFromDataTransfer(event.dataTransfer);
  if (imageFiles.length === 0) return;
  event.preventDefault();
  void insertImageFilesAtSelection(imageFiles, {
    clientX: event.clientX,
    clientY: event.clientY
  });
});

document.addEventListener("dragend", () => {
  if (!isActiveDraggedMediaBlock()) return;
  clearMediaDragState();
});

document.addEventListener("paste", (event) => {
  const imageFiles = imageFilesFromDataTransfer(event.clipboardData);
  if (imageFiles.length === 0) return;

  const activeElement = document.activeElement;
  if (
    activeElement instanceof Element &&
    activeElement.matches("input, textarea, select") &&
    !editor.contains(activeElement)
  ) {
    return;
  }

  event.preventDefault();
  void insertImageFilesAtSelection(imageFiles);
});

citationAddButton.addEventListener("click", () => {
  addCitation(citationInsertPending);
});

const handleCitationGeneratorKeydown = (event) => {
  if (event.key === "Escape") {
    event.preventDefault();
    closeCitationSidebar();
    ensureSelectionOnSurface();
    return;
  }

  if ((event.metaKey || event.ctrlKey || event.shiftKey) && event.key === "Enter") {
    event.preventDefault();
    addCitation(true);
  }
};

[
  citationAuthorInput,
  citationTitleInput,
  citationSourceInput,
  citationYearInput,
  citationUrlInput,
  citationAccessedInput,
  citationInput
]
  .filter(Boolean)
  .forEach((input) => {
    input.addEventListener("keydown", handleCitationGeneratorKeydown);
    input.addEventListener("input", () => {
      syncCitationPreview();
    });
  });

citationFormatSelect.addEventListener("change", () => {
  const nextFormat = normalizeCitationFormat(citationFormatSelect.value);
  metadataSettings = {
    ...metadataSettings,
    citationFormat: nextFormat
  };
  citationFormatSelect.value = nextFormat;
  persistMetadataState();
  renderCitationList();
  refreshCitationMarkersAndReferences();
  syncCitationPreview();
});

pageSizeSelect.addEventListener("change", () => {
  const nextPageSize = normalizePageSize(pageSizeSelect.value);
  metadataSettings = {
    ...metadataSettings,
    pageSize: nextPageSize
  };
  pageSizeSelect.value = nextPageSize;
  applyPageLayout();
  persistMetadataState();
});

pageOrientationSelect.addEventListener("change", () => {
  const nextOrientation = normalizePageOrientation(pageOrientationSelect.value);
  metadataSettings = {
    ...metadataSettings,
    pageOrientation: nextOrientation
  };
  pageOrientationSelect.value = nextOrientation;
  applyPageLayout();
  persistMetadataState();
});

const readMarginInputValue = (input, fallback) => {
  if (!input) return fallback;
  const raw = String(input.value || "").trim();
  if (!raw) return fallback;
  return normalizeMarginInches(raw, fallback);
};

const applyMarginInputs = () => {
  const current = normalizePageMargins(metadataSettings.pageMargins);
  const nextMargins = normalizePageMargins({
    top: readMarginInputValue(marginTopInput, current.top),
    right: readMarginInputValue(marginRightInput, current.right),
    bottom: readMarginInputValue(marginBottomInput, current.bottom),
    left: readMarginInputValue(marginLeftInput, current.left)
  });
  metadataSettings = {
    ...metadataSettings,
    pageMargins: nextMargins
  };
  syncMarginInputs(nextMargins);
  applyPageLayout();
  persistMetadataState();
};

[marginTopInput, marginRightInput, marginBottomInput, marginLeftInput]
  .filter(Boolean)
  .forEach((input) => {
    input.addEventListener("change", applyMarginInputs);
    input.addEventListener("blur", applyMarginInputs);
    input.addEventListener("keydown", (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      applyMarginInputs();
      input.blur();
    });
  });

if (tableSidebar instanceof HTMLElement) {
  const applyTableMutation = (mutator, options = {}) => {
    if (!(activeTableElement instanceof HTMLTableElement) || !editor.contains(activeTableElement)) return;
    const changed = typeof mutator === "function" ? Boolean(mutator(activeTableElement)) : false;
    if (!changed) return;
    syncTableNumbers();
    syncTableSidebarControls();
    markDocumentChanged({ deferPageGuides: Boolean(options.deferPageGuides) });
  };

  if (tableTabStructureButton) {
    tableTabStructureButton.addEventListener("click", () => {
      setTableSidebarTab("structure");
    });
  }

  if (tableTabAnalyzeButton) {
    tableTabAnalyzeButton.addEventListener("click", () => {
      setTableSidebarTab("analyze");
    });
  }

  if (tableCaptionInput instanceof HTMLInputElement) {
    const applyCaption = () => {
      applyTableMutation((table) => {
        const caption = ensureTableCaption(table);
        if (!(caption instanceof HTMLElement)) return false;
        const suffix = normalizeTableCaptionSuffix(tableCaptionInput.value);
        caption.textContent = suffix;
        return true;
      });
    };
    tableCaptionInput.addEventListener("input", applyCaption);
    tableCaptionInput.addEventListener("change", applyCaption);
    tableCaptionInput.addEventListener("blur", applyCaption);
  }

  tableAddRowButton?.addEventListener("click", () => {
    applyTableMutation(appendTableRow);
  });

  tableRemoveRowButton?.addEventListener("click", () => {
    applyTableMutation(removeTableRow);
  });

  tableAddColButton?.addEventListener("click", () => {
    applyTableMutation(appendTableColumn);
  });

  tableRemoveColButton?.addEventListener("click", () => {
    applyTableMutation(removeTableColumn);
  });

  if (tableAnalysisPrecisionInput instanceof HTMLInputElement) {
    tableAnalysisPrecisionInput.addEventListener("change", () => {
      tableAnalysisPrecisionInput.value = String(normalizeTableAnalysisPrecision(tableAnalysisPrecisionInput.value));
    });
    tableAnalysisPrecisionInput.addEventListener("blur", () => {
      tableAnalysisPrecisionInput.value = String(normalizeTableAnalysisPrecision(tableAnalysisPrecisionInput.value));
    });
  }

  tableAddColumnMeanButton?.addEventListener("click", () => {
    applyTableMutation(addColumnMeansToTable);
  });

  tableAddRowMeanButton?.addEventListener("click", () => {
    applyTableMutation(addRowMeansToTable);
  });

  tableAddColumnStdButton?.addEventListener("click", () => {
    applyTableMutation(addColumnStdDevToTable);
  });

  tableAddRowStdButton?.addEventListener("click", () => {
    applyTableMutation(addRowStdDevToTable);
  });

  tableApplyUncertaintyButton?.addEventListener("click", () => {
    applyTableMutation((table) => {
      const source =
        tableUncertaintySourceSelect instanceof HTMLSelectElement && tableUncertaintySourceSelect.value === "row"
          ? "row"
          : "column";
      return applyUncertaintyToTableCells(table, source);
    });
  });

  tableClearUncertaintyButton?.addEventListener("click", () => {
    applyTableMutation((table) => clearTableUncertaintyCells(table));
  });
}

buildMenu();
buildSaveFormatBar();

const urlFile = new URLSearchParams(window.location.search).get("file");
if (urlFile) {
  fetch(urlFile)
    .then((r) => r.text())
    .then((text) => {
      const payload = parsePaperFileText(text);
      hydrateFromPayload(payload, { fileName: ensurePaperExtension(urlFile.split("/").pop()), isDirty: false });
    })
    .catch(() => restoreDraft());
} else {
  restoreDraft();
}

try {
  document.execCommand("styleWithCSS", false, false);
  document.execCommand("defaultParagraphSeparator", false, "p");
} catch {
  // Some browsers do not support one or both commands.
}

if (!titleField.textContent.trim()) {
  titleField.focus({ preventScroll: true });
} else {
  focusEditorAtEnd();
}

updateMenuVisuals();
updateWindowTitle();
scheduleWindowStatus(true);
registerServiceWorker();

window.addEventListener("load", () => {
  rerenderLatexTokens();
});
