import sys
import json

english_translation_file = "./src/assets/i18n/en.json"
key, string = sys.argv[1:3]
key = str(key).upper()
past_verb = "created"

print "NOTE: Translation keys are saved in all capital letters"

with open(english_translation_file) as translation_file:
    translation_decoded = json.load(translation_file)

if key in translation_decoded:
	answer = raw_input("Translation key already exists. Overwrite key? [Y/n]: ")
	if answer == "Y":
		past_verb = "overwritten"
		print "Overwriting translation key.."
	else:
		sys.exit("New translation key creation aborted.")


translation_decoded[key] = str(string)

with open(english_translation_file, 'w') as translation_file:
    json.dump(translation_decoded, translation_file, sort_keys=True, indent=2)
    print("Translation key (%s) was successfully %s." %(key, past_verb))