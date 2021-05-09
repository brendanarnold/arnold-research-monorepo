import {
  ITranslatable,
  StoredPlainObject,
  StringTree,
  IView,
  IViewBuilder
} from '../../types'
import * as Polyglot from 'node-polyglot'

export class FormView implements IView {
  locale: string

  private _translations: StringTree
  private _polyglot: Polyglot

  public set translations(translations: StringTree) {
    this._translations = translations
    this._polyglot = new Polyglot({ phrases: translations })
  }

  public get translations(): StringTree {
    return this._translations
  }

  translate(item: ITranslatable): string {
    return this._polyglot.t(item.translateKey, item.translateVars)
  }

  toJson(): StoredPlainObject {
    return {
      type: FormView.name,
      locale: this.locale,
      translations: this._translations
    }
  }
}

export const formViewBuilder: IViewBuilder = {
  name: FormView.name,
  fromJson(json: StoredPlainObject): FormView {
    const view = new FormView()
    view.locale = json.locale
    view.translations = json.translations
    return view
  }
}
