/**
 * Concrete Calculator Pro - Main JavaScript
 * Handles all calculator functionality and UI interactions
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize shape selectors
    initShapeSelectors();
    
    // Initialize form fields for different shapes
    initFormFields();
    
    // Initialize calculation buttons
    document.getElementById('calculate-volume').addEventListener('click', calculateVolume);
    document.getElementById('calculate-materials').addEventListener('click', calculateMaterials);
    
    // Initialize FAQ toggles
    initFaqToggles();
    
    // Set current year in footer
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Initialize custom input handlers
    initCustomInputs();
    
    // Initialize shape diagrams
    initShapeDiagrams();
    
    // 设置各个形状计算器的默认值
    setDefaultValues();
    
    // 页面加载后自动计算并显示默认值的结果，但不自动滚动
    setTimeout(function() {
        calculateVolume();
        calculateMaterials();
    }, 500);
});

/**
 * 设置各个形状计算器的默认值
 */
function setDefaultValues() {
    // 板块(Slab)默认值
    document.getElementById('slab-length').value = '4.0';
    document.getElementById('slab-width').value = '3.0';
    document.getElementById('slab-thickness').value = '0.15';
    
    // 基脚(Footing)默认值
    document.getElementById('footing-length').value = '2.0';
    document.getElementById('footing-width').value = '0.5';
    document.getElementById('footing-thickness').value = '0.3';
    
    // 柱子(Column)默认值
    document.getElementById('column-diameter').value = '0.3';
    document.getElementById('column-length').value = '0.4';
    document.getElementById('column-width').value = '0.4';
    document.getElementById('column-height').value = '3.0';
    
    // 墙壁(Wall)默认值
    document.getElementById('wall-length').value = '5.0';
    document.getElementById('wall-height').value = '2.5';
    document.getElementById('wall-thickness').value = '0.2';
    
    // 圆形(Circular)默认值
    document.getElementById('circular-diameter').value = '3.0';
    document.getElementById('circular-thickness').value = '0.15';
    
    // 路沿(Curb)默认值
    document.getElementById('curb-length').value = '10.0';
    document.getElementById('curb-height').value = '0.25';
    document.getElementById('curb-width').value = '0.15';
    document.getElementById('gutter-width').value = '0.3';
    document.getElementById('gutter-depth').value = '0.1';
    
    // 楼梯(Stairs)默认值
    document.getElementById('stairs-width').value = '1.2';
    document.getElementById('stairs-tread').value = '0.28';
    document.getElementById('stairs-riser').value = '0.17';
    document.getElementById('stairs-steps').value = '12';
    
    // 材料估算默认值
    document.getElementById('concrete-volume').value = '1.8';
}

/**
 * Initialize shape selectors
 */
function initShapeSelectors() {
    const shapeButtons = document.querySelectorAll('.shape-btn');
    const shapeFields = document.querySelectorAll('.shape-fields');
    
    shapeButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and fields
            shapeButtons.forEach(btn => btn.classList.remove('active'));
            shapeFields.forEach(field => field.classList.remove('active'));
            
            // Add active class to clicked button and corresponding fields
            button.classList.add('active');
            const shapeId = button.getAttribute('data-shape');
            document.querySelector(`.shape-fields.${shapeId}`).classList.add('active');
            
            // 如果切换到column，确保初始状态正确
            if (shapeId === 'column') {
                const columnType = document.querySelector('input[name="column-type"]:checked').value;
                drawColumnDiagram(columnType);
            }
        });
    });
}

/**
 * Initialize form fields for different shapes
 */
function initFormFields() {
    // Populate footing fields
    const footingFields = document.querySelector('.shape-fields.footing');
    footingFields.innerHTML = `
        <div class="shape-diagram" id="footing-diagram">
            <!-- 示意图将通过JavaScript动态生成 -->
        </div>
        <div class="form-group">
            <label for="footing-length">Length</label>
            <div class="input-with-unit">
                <input type="number" id="footing-length" step="0.01" min="0">
                <select id="footing-length-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="footing-width">Width</label>
            <div class="input-with-unit">
                <input type="number" id="footing-width" step="0.01" min="0">
                <select id="footing-width-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="footing-thickness">Thickness/Depth</label>
            <div class="input-with-unit">
                <input type="number" id="footing-thickness" step="0.01" min="0">
                <select id="footing-thickness-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
    `;
    
    // Populate column fields
    const columnFields = document.querySelector('.shape-fields.column');
    columnFields.innerHTML = `
        <div class="shape-diagram" id="column-diagram">
            <!-- 示意图将通过JavaScript动态生成 -->
        </div>
        <div class="form-group">
            <label for="column-diameter">Diameter (for round columns)</label>
            <div class="input-with-unit">
                <input type="number" id="column-diameter" step="0.01" min="0">
                <select id="column-diameter-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="column-length">Length (for rectangular columns)</label>
            <div class="input-with-unit">
                <input type="number" id="column-length" step="0.01" min="0">
                <select id="column-length-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="column-width">Width (for rectangular columns)</label>
            <div class="input-with-unit">
                <input type="number" id="column-width" step="0.01" min="0">
                <select id="column-width-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="column-height">Height</label>
            <div class="input-with-unit">
                <input type="number" id="column-height" step="0.01" min="0">
                <select id="column-height-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label>Column Type</label>
            <div class="radio-group">
                <label>
                    <input type="radio" name="column-type" value="round" checked>
                    Round Column
                </label>
                <label>
                    <input type="radio" name="column-type" value="rectangular">
                    Rectangular Column
                </label>
            </div>
        </div>
    `;
    
    // Populate wall fields
    const wallFields = document.querySelector('.shape-fields.wall');
    wallFields.innerHTML = `
        <div class="shape-diagram" id="wall-diagram">
            <!-- 示意图将通过JavaScript动态生成 -->
        </div>
        <div class="form-group">
            <label for="wall-length">Length</label>
            <div class="input-with-unit">
                <input type="number" id="wall-length" step="0.01" min="0">
                <select id="wall-length-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="wall-height">Height</label>
            <div class="input-with-unit">
                <input type="number" id="wall-height" step="0.01" min="0">
                <select id="wall-height-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="wall-thickness">Thickness</label>
            <div class="input-with-unit">
                <input type="number" id="wall-thickness" step="0.01" min="0">
                <select id="wall-thickness-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
    `;
    
    // Populate curb fields
    const curbFields = document.querySelector('.shape-fields.curb');
    curbFields.innerHTML = `
        <div class="shape-diagram" id="curb-diagram">
            <!-- 示意图将通过JavaScript动态生成 -->
        </div>
        <div class="form-group">
            <label for="curb-length">Length</label>
            <div class="input-with-unit">
                <input type="number" id="curb-length" step="0.01" min="0">
                <select id="curb-length-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="curb-height">Curb Height</label>
            <div class="input-with-unit">
                <input type="number" id="curb-height" step="0.01" min="0">
                <select id="curb-height-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="curb-width">Curb Width</label>
            <div class="input-with-unit">
                <input type="number" id="curb-width" step="0.01" min="0">
                <select id="curb-width-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="gutter-width">Gutter Width</label>
            <div class="input-with-unit">
                <input type="number" id="gutter-width" step="0.01" min="0">
                <select id="gutter-width-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
        
        <div class="form-group">
            <label for="gutter-depth">Gutter Depth</label>
            <div class="input-with-unit">
                <input type="number" id="gutter-depth" step="0.01" min="0">
                <select id="gutter-depth-unit">
                    <option value="meters">meters</option>
                    <option value="centimeters">centimeters</option>
                    <option value="feet">feet</option>
                    <option value="inches">inches</option>
                    <option value="yards">yards</option>
                </select>
            </div>
        </div>
    `;
    
    // Add event listeners for column type radio buttons
    const columnTypeRadios = document.querySelectorAll('input[name="column-type"]');
    const columnDiameterGroup = document.getElementById('column-diameter').closest('.form-group');
    const columnLengthGroup = document.getElementById('column-length').closest('.form-group');
    const columnWidthGroup = document.getElementById('column-width').closest('.form-group');
    
    columnTypeRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            if (radio.value === 'round') {
                columnDiameterGroup.style.display = 'block';
                columnLengthGroup.style.display = 'none';
                columnWidthGroup.style.display = 'none';
            } else {
                columnDiameterGroup.style.display = 'none';
                columnLengthGroup.style.display = 'block';
                columnWidthGroup.style.display = 'block';
            }
        });
    });
    
    // Trigger change event to set initial state
    columnTypeRadios[0].dispatchEvent(new Event('change'));
}

/**
 * Initialize custom inputs (custom density, custom bag size, etc.)
 */
function initCustomInputs() {
    // Custom density
    const customDensityRadio = document.querySelector('input[name="concrete-density"][value="custom"]');
    const customDensityInput = document.querySelector('.custom-density');
    
    document.querySelectorAll('input[name="concrete-density"]').forEach(radio => {
        radio.addEventListener('change', () => {
            customDensityInput.style.display = customDensityRadio.checked ? 'block' : 'none';
        });
    });
    
    // Custom mix ratio
    const customRatioRadio = document.querySelector('input[name="mix-ratio"][value="custom"]');
    const customRatioInputs = document.querySelector('.custom-ratio');
    
    document.querySelectorAll('input[name="mix-ratio"]').forEach(radio => {
        radio.addEventListener('change', () => {
            customRatioInputs.style.display = customRatioRadio.checked ? 'block' : 'none';
        });
    });
    
    // Custom bag size
    const customBagSizeRadio = document.querySelector('input[name="cement-bag-size"][value="custom"]');
    const customBagSizeInput = document.querySelector('.custom-bag-size');
    
    document.querySelectorAll('input[name="cement-bag-size"]').forEach(radio => {
        radio.addEventListener('change', () => {
            customBagSizeInput.style.display = customBagSizeRadio.checked ? 'block' : 'none';
        });
    });
}

/**
 * Initialize FAQ toggles
 */
function initFaqToggles() {
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        const answer = question.nextElementSibling;
        answer.style.display = 'none'; // Hide all answers initially
        
        question.addEventListener('click', () => {
            const isOpen = answer.style.display === 'block';
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
            document.querySelectorAll('.faq-toggle i').forEach(i => i.className = 'fas fa-chevron-down');
            
            // Toggle current FAQ item
            answer.style.display = isOpen ? 'none' : 'block';
            const icon = question.querySelector('.faq-toggle i');
            icon.className = isOpen ? 'fas fa-chevron-down' : 'fas fa-chevron-up';
        });
    });
}

/**
 * 初始化并绘制形状测量示意图
 */
function initShapeDiagrams() {
    // 板块(Slab)示意图
    const slabDiagram = document.getElementById('slab-diagram');
    slabDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <rect x="20" y="20" width="160" height="80" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            
            <!-- 长度标注 -->
            <line x1="20" y1="10" x2="180" y2="10" class="dimension-line"/>
            <line x1="20" y1="8" x2="20" y2="12" class="dimension-line"/>
            <line x1="180" y1="8" x2="180" y2="12" class="dimension-line"/>
            <text x="100" y="7" class="dimension-label">Length</text>
            
            <!-- 宽度标注 -->
            <line x1="190" y1="20" x2="190" y2="100" class="dimension-line"/>
            <line x1="188" y1="20" x2="192" y2="20" class="dimension-line"/>
            <line x1="188" y1="100" x2="192" y2="100" class="dimension-line"/>
            <text x="195" y="60" class="dimension-label" transform="rotate(90,195,60)">Width</text>
            
            <!-- 厚度标注 -->
            <line x1="50" y1="110" x2="70" y2="110" class="dimension-line"/>
            <text x="60" y="118" class="dimension-label">Thickness</text>
        </svg>
    `;
    
    // 基脚(Footing)示意图
    const footingDiagram = document.getElementById('footing-diagram');
    footingDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <rect x="20" y="60" width="160" height="40" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            
            <!-- 长度标注 -->
            <line x1="20" y1="110" x2="180" y2="110" class="dimension-line"/>
            <line x1="20" y1="108" x2="20" y2="112" class="dimension-line"/>
            <line x1="180" y1="108" x2="180" y2="112" class="dimension-line"/>
            <text x="100" y="118" class="dimension-label">Length</text>
            
            <!-- 宽度标注 -->
            <line x1="190" y1="60" x2="190" y2="100" class="dimension-line"/>
            <line x1="188" y1="60" x2="192" y2="60" class="dimension-line"/>
            <line x1="188" y1="100" x2="192" y2="100" class="dimension-line"/>
            <text x="195" y="80" class="dimension-label" transform="rotate(90,195,80)">Width</text>
            
            <!-- 厚度标注 -->
            <line x1="50" y1="50" x2="50" y2="60" class="dimension-line"/>
            <line x1="70" y1="50" x2="70" y2="60" class="dimension-line"/>
            <line x1="50" y1="50" x2="70" y2="50" class="dimension-line"/>
            <text x="60" y="45" class="dimension-label">Thickness</text>
        </svg>
    `;
    
    // 柱子(Column)示意图 - 默认为圆柱
    drawColumnDiagram('round');
    
    // 墙壁(Wall)示意图
    const wallDiagram = document.getElementById('wall-diagram');
    wallDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <rect x="40" y="20" width="30" height="80" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            <rect x="130" y="20" width="30" height="80" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            <rect x="40" y="20" width="120" height="80" fill="none" stroke="#2c6fbd" stroke-width="2" stroke-dasharray="3,3"/>
            
            <!-- 长度标注 -->
            <line x1="40" y1="10" x2="160" y2="10" class="dimension-line"/>
            <line x1="40" y1="8" x2="40" y2="12" class="dimension-line"/>
            <line x1="160" y1="8" x2="160" y2="12" class="dimension-line"/>
            <text x="100" y="7" class="dimension-label">Length</text>
            
            <!-- 高度标注 -->
            <line x1="180" y1="20" x2="180" y2="100" class="dimension-line"/>
            <line x1="178" y1="20" x2="182" y2="20" class="dimension-line"/>
            <line x1="178" y1="100" x2="182" y2="100" class="dimension-line"/>
            <text x="190" y="60" class="dimension-label" transform="rotate(90,190,60)">Height</text>
            
            <!-- 厚度标注 -->
            <line x1="75" y1="60" x2="95" y2="60" class="dimension-line"/>
            <text x="85" y="55" class="dimension-label">Thickness</text>
        </svg>
    `;
    
    // 圆形(Circular)示意图
    const circularDiagram = document.getElementById('circular-diagram');
    circularDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <circle cx="100" cy="60" r="50" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            
            <!-- 直径标注 -->
            <line x1="50" y1="40" x2="150" y2="40" class="dimension-line"/>
            <line x1="50" y1="38" x2="50" y2="42" class="dimension-line"/>
            <line x1="150" y1="38" x2="150" y2="42" class="dimension-line"/>
            <text x="100" y="35" class="dimension-label">Diameter</text>
            
            <!-- 厚度标注 -->
            <line x1="120" y1="80" x2="140" y2="80" class="dimension-line"/>
            <text x="130" y="90" class="dimension-label">Thickness</text>
        </svg>
    `;
    
    // 路缘(Curb)示意图
    const curbDiagram = document.getElementById('curb-diagram');
    curbDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <!-- 路缘和排水沟 -->
            <path d="M20,60 L20,40 L60,40 L60,80 L140,80 L140,40 L180,40 L180,60" 
                  fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
            
            <!-- 长度标注 -->
            <line x1="20" y1="90" x2="180" y2="90" class="dimension-line"/>
            <line x1="20" y1="88" x2="20" y2="92" class="dimension-line"/>
            <line x1="180" y1="88" x2="180" y2="92" class="dimension-line"/>
            <text x="100" y="98" class="dimension-label">Length</text>
            
            <!-- 路缘高度 -->
            <line x1="15" y1="40" x2="15" y2="60" class="dimension-line"/>
            <line x1="13" y1="40" x2="17" y2="40" class="dimension-line"/>
            <line x1="13" y1="60" x2="17" y2="60" class="dimension-line"/>
            <text x="5" y="50" class="dimension-label" transform="rotate(90,5,50)">Height</text>
            
            <!-- 路缘宽度 -->
            <line x1="30" y1="35" x2="50" y2="35" class="dimension-line"/>
            <text x="40" y="30" class="dimension-label">Width</text>
            
            <!-- 沟宽度 -->
            <line x1="70" y1="75" x2="130" y2="75" class="dimension-line"/>
            <text x="100" y="70" class="dimension-label">Gutter Width</text>
        </svg>
    `;
    
    // 楼梯(Stairs)示意图
    const stairsDiagram = document.getElementById('stairs-diagram');
    stairsDiagram.innerHTML = `
        <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
            <!-- 楼梯 -->
            <path d="M20,100 L50,100 L50,80 L80,80 L80,60 L110,60 L110,40 L140,40 L140,20 L170,20" 
                  fill="none" stroke="#2c6fbd" stroke-width="2"/>
            <path d="M20,100 L170,100 L170,20" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2" fill-opacity="0.3"/>
            
            <!-- 宽度标注 (垂直于页面) -->
            <text x="10" y="60" class="dimension-label" transform="rotate(90,10,60)">Width</text>
            
            <!-- 踏板标注 -->
            <line x1="50" y1="90" x2="80" y2="90" class="dimension-line"/>
            <text x="65" y="95" class="dimension-label">Tread</text>
            
            <!-- 立板标注 -->
            <line x1="45" y1="80" x2="45" y2="100" class="dimension-line"/>
            <text x="40" y="90" class="dimension-label" transform="rotate(90,40,90)">Riser</text>
            
            <!-- 楼梯数量 -->
            <text x="140" y="90" class="dimension-label">Steps: n</text>
        </svg>
    `;
}

/**
 * 绘制柱子示意图 - 根据类型切换圆形或矩形
 */
function drawColumnDiagram(type) {
    const columnDiagram = document.getElementById('column-diagram');
    if (type === 'round') {
        columnDiagram.innerHTML = `
            <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
                <circle cx="100" cy="40" r="25" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
                <line x1="75" y1="40" x2="125" y2="40" stroke="#2c6fbd" stroke-width="1" stroke-dasharray="3,3"/>
                <rect x="75" y="40" width="50" height="60" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
                
                <!-- 直径标注 -->
                <line x1="70" y1="20" x2="130" y2="20" class="dimension-line"/>
                <line x1="70" y1="18" x2="70" y2="22" class="dimension-line"/>
                <line x1="130" y1="18" x2="130" y2="22" class="dimension-line"/>
                <text x="100" y="15" class="dimension-label">Diameter</text>
                
                <!-- 高度标注 -->
                <line x1="150" y1="40" x2="150" y2="100" class="dimension-line"/>
                <line x1="148" y1="40" x2="152" y2="40" class="dimension-line"/>
                <line x1="148" y1="100" x2="152" y2="100" class="dimension-line"/>
                <text x="160" y="70" class="dimension-label" transform="rotate(90,160,70)">Height</text>
            </svg>
        `;
    } else {
        columnDiagram.innerHTML = `
            <svg viewBox="0 0 200 120" width="200" height="120" preserveAspectRatio="xMidYMid meet">
                <rect x="75" y="30" width="50" height="40" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
                <rect x="75" y="30" width="50" height="70" fill="#e6f0ff" stroke="#2c6fbd" stroke-width="2"/>
                
                <!-- 长度标注 -->
                <line x1="75" y1="20" x2="125" y2="20" class="dimension-line"/>
                <line x1="75" y1="18" x2="75" y2="22" class="dimension-line"/>
                <line x1="125" y1="18" x2="125" y2="22" class="dimension-line"/>
                <text x="100" y="15" class="dimension-label">Length</text>
                
                <!-- 宽度标注 -->
                <line x1="65" y1="30" x2="65" y2="70" class="dimension-line"/>
                <line x1="63" y1="30" x2="67" y2="30" class="dimension-line"/>
                <line x1="63" y1="70" x2="67" y2="70" class="dimension-line"/>
                <text x="60" y="50" class="dimension-label" transform="rotate(90,60,50)">Width</text>
                
                <!-- 高度标注 -->
                <line x1="150" y1="30" x2="150" y2="100" class="dimension-line"/>
                <line x1="148" y1="30" x2="152" y2="30" class="dimension-line"/>
                <line x1="148" y1="100" x2="152" y2="100" class="dimension-line"/>
                <text x="160" y="65" class="dimension-label" transform="rotate(90,160,65)">Height</text>
            </svg>
        `;
    }
}

/**
 * Convert units to meters
 * @param {number} value - The input value
 * @param {string} unit - The input unit
 * @returns {number} - Value in meters
 */
function convertToMeters(value, unit) {
    switch (unit) {
        case 'meters':
            return value;
        case 'centimeters':
            return value / 100;
        case 'feet':
            return value * 0.3048;
        case 'inches':
            return value * 0.0254;
        case 'yards':
            return value * 0.9144;
        default:
            return value;
    }
}

/**
 * Calculate concrete volume based on selected shape and dimensions
 */
function calculateVolume() {
    // Get active shape
    const activeShape = document.querySelector('.shape-btn.active').getAttribute('data-shape');
    let volume = 0;
    
    // Calculate volume based on shape
    switch (activeShape) {
        case 'slab':
            const slabLength = convertToMeters(
                parseFloat(document.getElementById('slab-length').value),
                document.getElementById('length-unit').value
            );
            const slabWidth = convertToMeters(
                parseFloat(document.getElementById('slab-width').value),
                document.getElementById('width-unit').value
            );
            const slabThickness = convertToMeters(
                parseFloat(document.getElementById('slab-thickness').value),
                document.getElementById('thickness-unit').value
            );
            
            volume = slabLength * slabWidth * slabThickness;
            break;
            
        case 'footing':
            const footingLength = convertToMeters(
                parseFloat(document.getElementById('footing-length').value),
                document.getElementById('footing-length-unit').value
            );
            const footingWidth = convertToMeters(
                parseFloat(document.getElementById('footing-width').value),
                document.getElementById('footing-width-unit').value
            );
            const footingThickness = convertToMeters(
                parseFloat(document.getElementById('footing-thickness').value),
                document.getElementById('footing-thickness-unit').value
            );
            
            volume = footingLength * footingWidth * footingThickness;
            break;
            
        case 'column':
            const columnHeight = convertToMeters(
                parseFloat(document.getElementById('column-height').value),
                document.getElementById('column-height-unit').value
            );
            
            const columnType = document.querySelector('input[name="column-type"]:checked').value;
            
            if (columnType === 'round') {
                const columnDiameter = convertToMeters(
                    parseFloat(document.getElementById('column-diameter').value),
                    document.getElementById('column-diameter-unit').value
                );
                
                // Volume of cylinder = π * r² * h
                volume = Math.PI * Math.pow(columnDiameter / 2, 2) * columnHeight;
            } else {
                const columnLength = convertToMeters(
                    parseFloat(document.getElementById('column-length').value),
                    document.getElementById('column-length-unit').value
                );
                const columnWidth = convertToMeters(
                    parseFloat(document.getElementById('column-width').value),
                    document.getElementById('column-width-unit').value
                );
                
                volume = columnLength * columnWidth * columnHeight;
            }
            break;
            
        case 'wall':
            const wallLength = convertToMeters(
                parseFloat(document.getElementById('wall-length').value),
                document.getElementById('wall-length-unit').value
            );
            const wallHeight = convertToMeters(
                parseFloat(document.getElementById('wall-height').value),
                document.getElementById('wall-height-unit').value
            );
            const wallThickness = convertToMeters(
                parseFloat(document.getElementById('wall-thickness').value),
                document.getElementById('wall-thickness-unit').value
            );
            
            volume = wallLength * wallHeight * wallThickness;
            break;
            
        case 'circular':
            const circularDiameter = convertToMeters(
                parseFloat(document.getElementById('circular-diameter').value),
                document.getElementById('diameter-unit').value
            );
            const circularThickness = convertToMeters(
                parseFloat(document.getElementById('circular-thickness').value),
                document.getElementById('circular-thickness-unit').value
            );
            
            // Volume of circular slab = π * r² * thickness
            volume = Math.PI * Math.pow(circularDiameter / 2, 2) * circularThickness;
            break;
            
        case 'curb':
            const curbLength = convertToMeters(
                parseFloat(document.getElementById('curb-length').value),
                document.getElementById('curb-length-unit').value
            );
            const curbHeight = convertToMeters(
                parseFloat(document.getElementById('curb-height').value),
                document.getElementById('curb-height-unit').value
            );
            const curbWidth = convertToMeters(
                parseFloat(document.getElementById('curb-width').value),
                document.getElementById('curb-width-unit').value
            );
            const gutterWidth = convertToMeters(
                parseFloat(document.getElementById('gutter-width').value) || 0,
                document.getElementById('gutter-width-unit').value
            );
            const gutterDepth = convertToMeters(
                parseFloat(document.getElementById('gutter-depth').value) || 0,
                document.getElementById('gutter-depth-unit').value
            );
            
            // Curb volume
            const curbVolume = curbLength * curbHeight * curbWidth;
            
            // Gutter volume (if dimensions are provided)
            const gutterVolume = (gutterWidth && gutterDepth) ? curbLength * gutterWidth * gutterDepth : 0;
            
            volume = curbVolume + gutterVolume;
            break;
            
        case 'stairs':
            const stairsWidth = convertToMeters(
                parseFloat(document.getElementById('stairs-width').value),
                document.getElementById('stairs-width-unit').value
            );
            const tread = convertToMeters(
                parseFloat(document.getElementById('stairs-tread').value),
                document.getElementById('stairs-tread-unit').value
            );
            const riser = convertToMeters(
                parseFloat(document.getElementById('stairs-riser').value),
                document.getElementById('stairs-riser-unit').value
            );
            const numSteps = parseInt(document.getElementById('stairs-steps').value);
            
            // Calculate stair volume
            // Total run = tread depth * number of steps
            // Total rise = riser height * number of steps
            // For a simplified calculation of concrete steps:
            // Average step volume = width * tread * (riser / 2)
            // Total volume = average step volume * number of steps
            volume = stairsWidth * tread * riser * numSteps / 2;
            break;
    }
    
    // Get concrete density
    let density = 2400; // Default density (kg/m³)
    
    const densityRadio = document.querySelector('input[name="concrete-density"]:checked');
    if (densityRadio.value === 'custom') {
        density = parseFloat(document.getElementById('custom-density-value').value);
    } else {
        density = parseFloat(densityRadio.value);
    }
    
    // Calculate weight
    const weight = volume * density;
    
    // Update material estimator input
    document.getElementById('concrete-volume').value = volume.toFixed(2);
    
    // Update results
    document.getElementById('result-volume').textContent = volume.toFixed(2);
    document.getElementById('result-weight').textContent = Math.round(weight);
    
    return volume;
}

/**
 * Calculate materials required based on concrete volume and mix ratio
 */
function calculateMaterials() {
    const volume = parseFloat(document.getElementById('concrete-volume').value);
    
    if (isNaN(volume) || volume <= 0) {
        alert('Please enter a valid concrete volume');
        return;
    }
    
    // Get mix ratio
    let cement = 1;
    let sand = 1.5;
    let aggregate = 3;
    
    const mixRatioRadio = document.querySelector('input[name="mix-ratio"]:checked');
    if (mixRatioRadio.value === 'custom') {
        cement = parseFloat(document.getElementById('cement-ratio').value);
        sand = parseFloat(document.getElementById('sand-ratio').value);
        aggregate = parseFloat(document.getElementById('aggregate-ratio').value);
    } else {
        // Set standard ratios based on selected mix
        switch (mixRatioRadio.value) {
            case 'M10':
                cement = 1;
                sand = 3;
                aggregate = 6;
                break;
            case 'M15':
                cement = 1;
                sand = 2;
                aggregate = 4;
                break;
            case 'M20':
                cement = 1;
                sand = 1.5;
                aggregate = 3;
                break;
            case 'M25':
                cement = 1;
                sand = 1;
                aggregate = 2;
                break;
        }
    }
    
    // Calculate parts total
    const totalParts = cement + sand + aggregate;
    
    // Get wastage percentage
    const wastage = parseFloat(document.getElementById('wastage-percentage').value) / 100 + 1;
    
    // Calculate dry volume (concrete volume * 1.54 to account for the air gaps in dry materials)
    const dryVolume = volume * 1.54 * wastage;
    
    // Calculate material weights
    // Cement: 1440 kg/m³, Sand: 1600 kg/m³, Aggregate: 1450 kg/m³
    const cementVolume = (cement / totalParts) * dryVolume;
    const sandVolume = (sand / totalParts) * dryVolume;
    const aggregateVolume = (aggregate / totalParts) * dryVolume;
    
    const cementWeight = cementVolume * 1440;
    const sandWeight = sandVolume * 1600;
    const aggregateWeight = aggregateVolume * 1450;
    
    // Get cement bag size
    let bagSize = 50;
    const bagSizeRadio = document.querySelector('input[name="cement-bag-size"]:checked');
    if (bagSizeRadio.value === 'custom') {
        bagSize = parseFloat(document.getElementById('custom-bag-size').value);
    } else {
        bagSize = parseFloat(bagSizeRadio.value);
    }
    
    // Calculate number of bags
    const bagCount = Math.ceil(cementWeight / bagSize);
    
    // Update results
    document.getElementById('result-bags').textContent = bagCount;
    document.getElementById('cement-amount').textContent = `${Math.round(cementWeight)} kg`;
    document.getElementById('sand-amount').textContent = `${Math.round(sandWeight)} kg`;
    document.getElementById('aggregate-amount').textContent = `${Math.round(aggregateWeight)} kg`;
    
    // Update material bars
    const totalWeight = cementWeight + sandWeight + aggregateWeight;
    document.querySelector('.cement-bar').style.width = `${(cementWeight / totalWeight) * 100}%`;
    document.querySelector('.sand-bar').style.width = `${(sandWeight / totalWeight) * 100}%`;
    document.querySelector('.aggregate-bar').style.width = `${(aggregateWeight / totalWeight) * 100}%`;
    
    // Calculate costs
    calculateCosts(cementWeight, sandWeight, aggregateWeight, bagSize);
    
    return true;
}

/**
 * Calculate material costs
 * @param {number} cementWeight - Cement weight in kg
 * @param {number} sandWeight - Sand weight in kg
 * @param {number} aggregateWeight - Aggregate weight in kg
 * @param {number} bagSize - Cement bag size in kg
 */
function calculateCosts(cementWeight, sandWeight, aggregateWeight, bagSize) {
    // Get material costs
    const cementCost = parseFloat(document.getElementById('cement-cost').value);
    const sandCost = parseFloat(document.getElementById('sand-cost').value);
    const aggregateCost = parseFloat(document.getElementById('aggregate-cost').value);
    
    // Get currencies
    const cementCurrency = document.getElementById('cement-currency').value;
    const sandCurrency = document.getElementById('sand-currency').value;
    const aggregateCurrency = document.getElementById('aggregate-currency').value;
    const displayCurrency = document.getElementById('display-currency').value;
    
    // Convert all costs to USD first (simplified exchange rates for demonstration)
    const exchangeRates = {
        'USD': 1,
        'EUR': 1.09,
        'GBP': 1.27,
        'JPY': 0.0068,
        'CAD': 0.74
    };
    
    // Calculate costs in their original currencies
    const cementBags = Math.ceil(cementWeight / bagSize);
    const cementCostTotal = cementBags * cementCost;
    const sandCostTotal = (sandWeight / 1000) * sandCost; // Convert kg to tons
    const aggregateCostTotal = (aggregateWeight / 1000) * aggregateCost; // Convert kg to tons
    
    // Convert to USD
    const cementCostUSD = cementCostTotal / exchangeRates[cementCurrency];
    const sandCostUSD = sandCostTotal / exchangeRates[sandCurrency];
    const aggregateCostUSD = aggregateCostTotal / exchangeRates[aggregateCurrency];
    
    // Calculate total cost in USD
    const totalCostUSD = cementCostUSD + sandCostUSD + aggregateCostUSD;
    
    // Convert to display currency
    const totalCostDisplay = totalCostUSD * exchangeRates[displayCurrency];
    
    // Update cost bars
    const totalCost = cementCostUSD + sandCostUSD + aggregateCostUSD;
    document.querySelector('.cement-cost-bar').style.width = `${(cementCostUSD / totalCost) * 100}%`;
    document.querySelector('.sand-cost-bar').style.width = `${(sandCostUSD / totalCost) * 100}%`;
    document.querySelector('.aggregate-cost-bar').style.width = `${(aggregateCostUSD / totalCost) * 100}%`;
    
    // Format currency for display
    const currencyFormatter = new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: displayCurrency,
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    });
    
    // Update cost displays
    document.getElementById('cement-cost-value').textContent = currencyFormatter.format(cementCostUSD * exchangeRates[displayCurrency]);
    document.getElementById('sand-cost-value').textContent = currencyFormatter.format(sandCostUSD * exchangeRates[displayCurrency]);
    document.getElementById('aggregate-cost-value').textContent = currencyFormatter.format(aggregateCostUSD * exchangeRates[displayCurrency]);
    document.getElementById('result-cost').textContent = Math.round(totalCostDisplay);
    document.getElementById('result-currency').textContent = displayCurrency;
} 