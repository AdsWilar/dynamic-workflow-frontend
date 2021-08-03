import {Component, Injectable, Input, OnInit} from '@angular/core';
import {FuseAnimations} from '../../../../../../../@fuse/animations';
import {ThemePalette} from '@angular/material/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject} from 'rxjs';
import {FlatTreeControl} from '@angular/cdk/tree';
import {MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material/tree';
import {SelectionModel} from '@angular/cdk/collections';
import {MatSelectChange} from '@angular/material/select';
import {InputType} from '../../../../../../interfaces/input-type.interface';
import {InputTypeService} from '../../../../../../services/input-type-service.service';

/** esto se agregó */
/**
 * Node for to-do item-
 * Nodo para elemento de tarea
 */

export class TodoItemNode {
    children: TodoItemNode[];
    item: string;
}

/** Flat to-do item node with expandable and level information
 * Nodo de elementos de tareas pendientes con información ampliable y de nivel */

export class TodoItemFlatNode {
    item: string;
    level: number;
    expandable: boolean;
}

/**
 * The Json object for to-do list data.
 * El objeto Json para los datos de la lista de tareas pendientes.
 */
const TREE_DATA = {

    Agregue: [
        ''
        // 'Read the Material Design spec',
        // 'Upgrade Application to Angular'
    ]
};

/**
 * Checklist database, it can build a tree structured Json object. // Base de datos de lista de verificación, puede construir un objeto Json estructurado en árbol.
 * Each node in Json object represents a to-do item or a category. // Cada nodo del objeto Json representa un elemento de tarea pendiente o una categoría.
 * If a node is a category, it has children items and new items can be added under the category.
 * //Si un nodo es una categoría, tiene elementos secundarios y se pueden agregar elementos nuevos en la categoría.
 */
@Injectable()
export class ChecklistDatabase {
    dataChange = new BehaviorSubject<TodoItemNode[]>([]);

    get data(): TodoItemNode[] {
        return this.dataChange.value;
    }

    constructor() {
        this.initialize();
    }

    initialize(): void {
        // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
        //     file node as children.
        // Construya los nodos del árbol a partir del objeto Json. El resultado es una lista de `TodoItemNode` con un nodo de archivo anidado como hijos.
        const data = this.buildFileTree(TREE_DATA, 0);

        // Notify the change.
        this.dataChange.next(data);
    }

    /**
     * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
     * The return value is the list of `TodoItemNode`.
     */
    buildFileTree(obj: { [key: string]: any }, level: number): TodoItemNode[] {
        return Object.keys(obj).reduce<TodoItemNode[]>((accumulator, key) => {
            const value = obj[key];
            const node = new TodoItemNode();
            node.item = key;

            if (value != null) {
                if (typeof value === 'object') {
                    node.children = this.buildFileTree(value, level + 1);
                } else {
                    node.item = value;
                }
            }

            return accumulator.concat(node);
        }, []);
    }

    /** Add an item to to-do list */
    insertItem(parent: TodoItemNode, name: string): void {
        if (parent.children) {
            parent.children.push({item: name} as TodoItemNode);
            this.dataChange.next(this.data);
        }
    }

    updateItem(node: TodoItemNode, name: string): void {
        node.item = name;
        this.dataChange.next(this.data);
    }
}

@Component({
    selector: 'dynamic-input',
    templateUrl: './dynamic-input.component.html',
    styleUrls: ['./dynamic-input.component.scss'],
    animations: FuseAnimations,
    providers: [ChecklistDatabase]
})

export class DynamicInputComponent implements OnInit {

    inputTypes: InputType[] = [];
    inputTypeSelected: InputType;
    color: ThemePalette = 'primary';
    checked = false;
    disabled = false;

    formFieldHelpers: string[] = [''];
    fileName = '';


    /** Map from flat node to nested node. This helps us finding the nested node to be modified
     * Asignar de nodo plano a nodo anidado. Esto nos ayuda a encontrar el nodo anidado que se va a modificar.
     */
    flatNodeMap = new Map<TodoItemFlatNode, TodoItemNode>();

    /** Map from nested node to flattened node. This helps us to keep the same object for selection */
    nestedNodeMap = new Map<TodoItemNode, TodoItemFlatNode>();

    /** A selected parent node to be inserted */
    selectedParent: TodoItemFlatNode | null = null;

    /** The new item's name */
    newItemName = '';

    treeControl: FlatTreeControl<TodoItemFlatNode>;

    treeFlattener: MatTreeFlattener<TodoItemNode, TodoItemFlatNode>;

    dataSource: MatTreeFlatDataSource<TodoItemNode, TodoItemFlatNode>;

    /** The selection for checklist */
    checklistSelection = new SelectionModel<TodoItemFlatNode>(true /* multiple */);

    constructor(private _database: ChecklistDatabase, private http: HttpClient, private inputTypeService: InputTypeService) {
        this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
            this.isExpandable, this.getChildren);
        this.treeControl = new FlatTreeControl<TodoItemFlatNode>(this.getLevel, this.isExpandable);
        this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);

        _database.dataChange.subscribe(data => {
            this.dataSource.data = data;
        });
    }

    ngOnInit(): void {

        this.inputTypeService.getAllInputTypes().subscribe((response) => {
            this.inputTypes = response.data;

            for (const inputType of this.inputTypes) {
                if (inputType.name === 'TEXT') {
                    this.inputTypeSelected = inputType;
                }
            }

        });


    }

    getLevel = (node: TodoItemFlatNode) => node.level;

    isExpandable = (node: TodoItemFlatNode) => node.expandable;

    getChildren = (node: TodoItemNode): TodoItemNode[] => node.children;

    hasChild = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.expandable;

    hasNoContent = (_: number, _nodeData: TodoItemFlatNode) => _nodeData.item === '';


    /**
     * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
     */
    transformer = (node: TodoItemNode, level: number) => {
        const existingNode = this.nestedNodeMap.get(node);
        const flatNode = existingNode && existingNode.item === node.item
            ? existingNode
            : new TodoItemFlatNode();
        flatNode.item = node.item;
        flatNode.level = level;
        flatNode.expandable = !!node.children?.length;
        this.flatNodeMap.set(flatNode, node);
        this.nestedNodeMap.set(node, flatNode);
        return flatNode;
    };

    /** Whether all the descendants of the node are selected. */
    descendantsAllSelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return this.checklistSelection.isSelected(child);
        });
        return descAllSelected;
    }

    /** Whether part of the descendants are selected */
    descendantsPartiallySelected(node: TodoItemFlatNode): boolean {
        const descendants = this.treeControl.getDescendants(node);
        const result = descendants.some(child => this.checklistSelection.isSelected(child));
        return result && !this.descendantsAllSelected(node);
    }

    /** Toggle the to-do item selection. Select/deselect all the descendants node */
    todoItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        const descendants = this.treeControl.getDescendants(node);
        this.checklistSelection.isSelected(node)
            ? this.checklistSelection.select(...descendants)
            : this.checklistSelection.deselect(...descendants);

        // Force update for the parent
        descendants.forEach(child => this.checklistSelection.isSelected(child));
        this.checkAllParentsSelection(node);
    }

    /** Toggle a leaf to-do item selection. Check all the parents to see if they changed */
    todoLeafItemSelectionToggle(node: TodoItemFlatNode): void {
        this.checklistSelection.toggle(node);
        this.checkAllParentsSelection(node);
    }

    /* Checks all the parents when a leaf node is selected/unselected */
    checkAllParentsSelection(node: TodoItemFlatNode): void {
        let parent: TodoItemFlatNode | null = this.getParentNode(node);
        while (parent) {
            this.checkRootNodeSelection(parent);
            parent = this.getParentNode(parent);
        }
    }

    /** Check root node checked state and change it accordingly */
    checkRootNodeSelection(node: TodoItemFlatNode): void {
        const nodeSelected = this.checklistSelection.isSelected(node);
        const descendants = this.treeControl.getDescendants(node);
        const descAllSelected = descendants.length > 0 && descendants.every(child => {
            return this.checklistSelection.isSelected(child);
        });
        if (nodeSelected && !descAllSelected) {
            this.checklistSelection.deselect(node);
        } else if (!nodeSelected && descAllSelected) {
            this.checklistSelection.select(node);
        }
    }

    /* Get the parent node of a node */
    getParentNode(node: TodoItemFlatNode): TodoItemFlatNode | null {
        const currentLevel = this.getLevel(node);

        if (currentLevel < 1) {
            return null;
        }

        const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

        for (let i = startIndex; i >= 0; i--) {
            const currentNode = this.treeControl.dataNodes[i];

            if (this.getLevel(currentNode) < currentLevel) {
                return currentNode;
            }
        }
        return null;
    }

    /** Select the category so we can insert the new item. */
    addNewItem(node: TodoItemFlatNode): void {
        const parentNode = this.flatNodeMap.get(node);
        // tslint:disable-next-line:no-non-null-assertion
        this._database.insertItem(parentNode!, '');
        this.treeControl.expand(node);
    }

    /** Save the node to database */
    saveNode(node: TodoItemFlatNode, itemValue: string): void {
        const nestedNode = this.flatNodeMap.get(node);
        // tslint:disable-next-line:no-non-null-assertion
        this._database.updateItem(nestedNode!, itemValue);
    }


    getFormFieldHelpersAsString(): string {
        return this.formFieldHelpers.join(' ');
    }

    onFileSelected(event): void {

        const file: File = event.target.files[0];

        if (file) {

            this.fileName = file.name;

            const formData = new FormData();

            formData.append('thumbnail', file);

            const upload$ = this.http.post('/api/thumbnail-upload', formData);

            upload$.subscribe();
        }
    }


    onSelectInputType(event: MatSelectChange): void {
        this.inputTypeSelected = event.value;
    }


}
