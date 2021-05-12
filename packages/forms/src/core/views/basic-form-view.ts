import {
  ITranslatable,
  StoredPlainObject,
  StringTree,
  IView,
  IViewBuilder
} from '../../types'
import * as Polyglot from 'node-polyglot'

export class BasicFormView implements IView {
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
      type: BasicFormView.name,
      locale: this.locale,
      translations: this._translations
    }
  }
}

export const builder: IViewBuilder = {
  type: BasicFormView.name,
  fromJson(json: StoredPlainObject): BasicFormView {
    const view = new BasicFormView()
    view.locale = json.locale
    view.translations = json.translations
    return view
  }
}
