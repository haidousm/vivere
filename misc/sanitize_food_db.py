if __name__ == "__main__":
    import json

    path = "/Users/moussa/Downloads/temp-study/openfoodfacts-products.jsonl"

    food_items = []
    i = 0
    with open(path, "r") as f:
        for line in f:
            raw_food_item = json.loads(line)
            food_item = {}
            if i >= 3000000 and i < 5000000:
                if "_id" in raw_food_item.keys():
                    food_item["importedID"] = raw_food_item["_id"]
                if "code" in raw_food_item.keys():
                    food_item["GTIN13"] = raw_food_item["code"]
                if "product_name" in raw_food_item.keys():
                    food_item["name"] = raw_food_item["product_name"]
                if "brands" in raw_food_item.keys():
                    food_item["brand"] = raw_food_item["brands"]
                if "nutriments" in raw_food_item.keys():
                    if "energy-kcal_serving" in raw_food_item["nutriments"].keys():
                        food_item["caloriesPerServing"] = raw_food_item["nutriments"]["energy-kcal_serving"]
                    else:
                        continue
                if "serving_size" in raw_food_item.keys():
                    food_item["servingSize"] = raw_food_item["serving_size"]
                food_items.append(food_item)
            if i >= 5000000:
                break
            i += 1
        with open("food_items.jsonl", "w") as f:
            for food_item in food_items:
                f.write(json.dumps(food_item) + "\n")
